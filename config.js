const config={
     //after hosting the backend code from the backend app(backend code) into an ec2 instance on aws you need to get the ec2 public link to access that server and replace
     //the localhost_url variable down here to that new ec2 public access link 
     
     // using this localhost_url your frontend app is communicating with the backend, OKAY?? 

     localhost_url:'http://192.168.2.7:8080',

//     localhost_url:'http://ec2-35-154-155-123.ap-south-1.compute.amazonaws.com:8080'   //this one is for hometheatre and it's not having payment and 2 videos algo support
    }

    export default config;
