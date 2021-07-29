{
    console.log('hello');
    //So in this we are using ajax and jquery to send data 
    //we have use id of post form and prevernt its default  nature of submit so that we want to send data through ajax method that's why
    let createPost=function(){
        let newPostForm= $('#new-post-form');
        //console.log(newPostForm);
        newPostForm.submit((e)=>{
         e.preventDefault();
        //Now we will submit it using ajax manually
        $.ajax({
            type:'post',
            url:'/post/create',
            //its basically serializing the data into json form of the form
            data: newPostForm.serialize(),
            //this sis the function of response if data send successfully
            success:(data)=>{
                console.log(data);
                let newPost=newPostDom(data.data.post);
                $('#post-list-container>ul').prepend(newPost);
            },
            //In error there will be responsetext
            error:(err)=>{
                console.log(err.responsetext)
            }
        })
    })
    }

    // let deletPost=function()
    // {
    //     let newPostForm = $('#delete-post-button');

    //     newPostForm.click(function(e){
    //         console.log('a tag clicked')
    //         e.preventDefault();
            
    //     })
    // }
    // deletPost();
    let newPostDom=(post)=>{
        return $(`<p id="post-${post._id}">
        <p>
        ${ post.content }
             <small id="outer-id"><a id="delete-post-button" href="/post/destroy/${ post._id}">x</a></small>
            <small  style="display: block;">${post.user.name}</small>          
         </p>
     </p>`)
    }


    createPost();
    //method to create a post in dom
}