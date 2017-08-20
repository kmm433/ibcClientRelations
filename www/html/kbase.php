<?php
  session_start();
  // Verify that the user has signed in and enfore if they have not
  if(!$_SESSION['user'])
    header('Location: kbase.php');
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Illawarra Business Chamber | KBASE</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="css/theme.css">
  </head>
  <body>
    <h1> Frequently Asked Questions </h1>


    <script type="text/javascript" src="//code.jquery.com/jquery-1.11.0.min.js"></script>

    <script>
     $(document).ready(function() {

        $('.faq_question').click(function() {

            if ($(this).parent().is('.open')){
                $(this).closest('.faq').find('.faq_answer_container').animate({'height':'0'},500);
                $(this).closest('.faq').removeClass('open');

                }else{
                    var newHeight =$(this).closest('.faq').find('.faq_answer').height() +'px';
                    $(this).closest('.faq').find('.faq_answer_container').animate({'height':newHeight},500);
                    $(this).closest('.faq').addClass('open');
                }

        });

    });
    </script>
    <style>
    /*FAQS*/
    .faq_question {
        margin: 0px;
        padding: 0px 0px 5px 0px;
        display: inline-block;
        cursor: pointer;
        font-weight: bold;
    }

    .faq_answer_container {
        height: 0px;
        overflow: hidden;
        padding: 0px;
    }
    </style>

    <div class="faq_container">
     <div class="faq">
        <div class="faq_question">A QUESTION IS ASKED</div>
             <div class="faq_answer_container">
                <div class="faq_answer">AN ANSWER IS GIVEN</div>
             </div>
      </div>
   </div>

   <div class="faq_container">
     <div class="faq">
        <div class="faq_question">A QUESTION IS ASKED 2</div>
             <div class="faq_answer_container">
                <div class="faq_answer">AN ANSWER IS GIVEN</div>
             </div>
      </div>
   </div>
 </div>

 <div class="faq_container">
   <div class="faq">
      <div class="faq_question">A QUESTION IS ASKED</div>
           <div class="faq_answer_container">
              <div class="faq_answer">AN ANSWER IS GIVEN</div>
           </div>
    </div>
 </div>

 <div class="faq_container">
   <div class="faq">
      <div class="faq_question">A QUESTION IS ASKED 2</div>
           <div class="faq_answer_container">
              <div class="faq_answer">AN ANSWER IS GIVEN</div>
           </div>
    </div>
 </div>

 <div class="faq_container">
   <div class="faq">
      <div class="faq_question">A QUESTION IS ASKED</div>
           <div class="faq_answer_container">
              <div class="faq_answer">AN ANSWER IS GIVEN</div>
           </div>
    </div>
 </div>

 <div class="faq_container">
   <div class="faq">
      <div class="faq_question">A QUESTION IS ASKED 2</div>
           <div class="faq_answer_container">
              <div class="faq_answer">AN ANSWER IS GIVEN</div>
           </div>
    </div>
 </div>

 <div class="faq_container">
   <div class="faq">
      <div class="faq_question">A QUESTION IS ASKED</div>
           <div class="faq_answer_container">
              <div class="faq_answer">AN ANSWER IS GIVEN</div>
           </div>
    </div>
 </div>

 <div class="faq_container">
   <div class="faq">
      <div class="faq_question">A QUESTION IS ASKED 2</div>
           <div class="faq_answer_container">
              <div class="faq_answer">AN ANSWER IS GIVEN</div>
           </div>
    </div>
 </div>

  </body>
</html>
