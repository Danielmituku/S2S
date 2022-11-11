const stripe =  require("stripe")(process.env.STRIPE_SECRET_KEY)
const Course = require("../models/courseModel")
const catchAsync = require("../utilis/catchAsync")
const AppError = require("../utilis/appError")

exports.getCourseCheckout = catchAsync(async (req, res, next) => {
    //1) get the Data, for the requested course including the tutor and review
    const course = await Course.findById(req.params.courseId).populate({
        path: 'review',
        fields: 'review rating student'
      }).populate({
        path: 'tutors',
        fields: 'name'
      })
    
    
      //3) render template using the data from step 1
      res.status(200).render('checkout', {
        title: "S2S | course",
        layout: './layouts/student-layout',
        course
      })
  })

exports.getCheckoutSession = catchAsync( async (req, res, next) => {
//1) get the currently course

const course = await Course.findById(req.params.courseId) 

//2) creating a product on stripe from our model

// const product = await stripe.products.create({
//     name: course.name,
//     default_price_data: {
//       unit_amount: course.price * 100,
//       currency: 'usd',
//       recurring: {interval: 'month'},
//     },
//     expand: ['default_price'],
//   });


//2) create chcekout session 
const session = await stripe.checkout.sessions.create({
    // automatic_payment_method_types: {enabled: true},
    success_url: `${req.protocol}://${req.get('host')}/success.html`,
    cancel_url: `${req.protocol}://${req.get('host')}/cancel.html`,
    mode: 'payment',
    customer_email: 'dberhe490@gmail.com',
    client_reference_id: req.params.courseId,
    line_items:[
        //  {  
         
            // quantity: 1,
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: 'price_1M0NVUSHD80dIqFQQ6ZUL21g',
                quantity: 1,
              },
            // price_data:{
            //     unit_amount: course.price * 100,
            //     currency: 'usd',
            //     product_data:{
            //         name: course.name ,
            //         description: course.summary,
            //         images:['https://www.bing.com/th?id=ORMS.ebbc2b6066dbdd445ad8f296cf08dcee&pid=Wdp&w=612&h=304&qlt=90&c=1&rs=1&dpr=1&p=0']
            //         },
            //     } 
            // }
        ]
        })

//3) create session as a response
    res.redirect(303, session.url);
})
