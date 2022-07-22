# mp4StreammingServer
This is a web file server for your computer. You can explore your computer's file system using other device's web browser.   
For example, If you run this program at your computer A, you can access A's file using mobile device B or other computer C.   
It is only possible when B,C can access A through network by router(Wi-Fi,LAN) or public ip or etc.   
<br/>
This explorer provides video/image's thumbnail so it will be helpful when you explore a lot of video/image.  
And you can play/watch Video(H264),Audio(mp3,AAC..),Image(jpg,png,..) and Document(text,pdf..) files. 

---------

# how to use

## you need nodejs and ffmpeg to run this program  
This program runs on nodejs so you must install nodejs to use this program.  
You can explore the filesystem and watch the contents without ffmpeg, but the explorer will not privide thumbnail of the video.

## install nodejs
https://nodejs.org/ko/download/  
Go to this page and download nodejs.

## install ffmpeg
https://ffmpeg.org/download.html  
Go to this page and download ffmpeg and register \bin folder to PATH.  

If you don't need video's thumbnail or play video other than mp4, you can pass this process.

## download program
https://github.com/OhRetry/mp4StreammingServer/archive/refs/heads/main.zip  
OR  
https://github.com/OhRetry/mp4StreammingServer -> code -> download Zip  

Download the program's zip file from the links above and unzip them.  

If you unzipped downloaded folder to C:\Users\administrator\Desktop\mp4StreammingServer  
Open terminal and type below command
```
cd "C:\Users\administrator\Desktop\mp4StreammingServer"
node install
```


## run program
If you have unzipped downloaded folder to C:\Users\administrator\Desktop\mp4StreammingServer
You can run the program by below command
```
cd "C:\Users\administrator\Desktop\mp4StreammingServer"
node server.js
```  
If you are using windows, you can easily run program by executing the mp4StreammingServer.bat
<br/>
<br/>
<br/>
<img width="393" alt="캡처1" src="https://user-images.githubusercontent.com/87797481/180237162-0e697cea-71f4-4452-a551-d2e4797d83bc.PNG">
<br/>
After running the program, you can see a screen like above      
<br/>
<br/>
<br/>
<img width="345" alt="캡처2" src="https://user-images.githubusercontent.com/87797481/180337008-27832a34-9ddc-4aa3-9c12-6341a34a49ba.PNG">
<br/>
Type server's address to your browser and you can see the home(index) page.
<br/>
<br/>
id is your account's id.
<br/>
authority is your account's privileges.   
<br/>

There are no registered users(account) in Default Setting.  
Therefore, the server does not login check and you have administrator privileges.  

Now, you can explore your filesystem. Click explorer Icon.  
<br/>
If you click Setting Icon, you can go to Administrator page. This Icon is only available when you have admin authority.
<br/>
# Setting
In Administrator page, you can set these things.  
<br/>

1. root path
2. port
3. use https?
4. Network Interface
5. users(account)

<br/>
And at the bottom of the page, you can see these 3 buttons.
<img width="145" alt="캡처0" src="https://user-images.githubusercontent.com/87797481/180365624-030aa92f-931c-44d5-9d1d-2f7e5d9ab468.PNG">
<br/>
If you click 'Home' button, you can go back to Home(Index) page.
<br/>
If you click 'Save' Button, you can save Setting in this page.
<br/>
If you click 'Reset' Button, you can reset Setting to default.
<br/>


## root path
root path is a highest folder that you allows users.  
If you set root path to D:\contents\movies and your private ip is 192.168.219.108,<br/> users can access D:\contents\movies\good1.mp4 by http://192.168.219.108:3000/root/good1.mp4  
<br/>
No one can access to D:\contents\music because users can access only subfolder of root.
<br/>
<br/>
Default is C:\

## port
server will use this port number. Default is 3000.
<br/>
If other program is using 3000, server will automatically change port to 3001,3002,...

## use https?
If you set this property true, server will use https.
<br/>
If you set this property false, server will use http.
<br/>
<br/>

This feature is for people who use public router or public IP and don't want to reveal your packet to others.
<br/>
<br/>
If you are using your Wi-Fi with other people, router's administrator can see your packet information.  
For example if you access http://192.168.219.108:3000/root/movie/example1.mp4 , administrator can know that you accessed 192.168.219.108:3000/root/movie/example.mp4 and even can know the movies's contents.  
<br/>
If you want to hide packet information In this case, you can use https.
<br/>
With https, packet is encrypted and administrator can only know IP address 192.168.219.108:3000 that you accessed.
<br/>
<br/>
You need cert.pem and key.pem file in cert folder to apply https.
<br/>
Default cert.pem and key.pem are in cert folder so you can use https. But you need to make your own cert.pem, key.pem if you concern security.
<br/>
You can make cert.pem and key.pem with openssl. If you're interested, search openssl.
<br/>
<br/>
Default is false.
## network interface
Using the network device name specified here, the server searches for the ip address and tells you the url that users on the same network can access.
<br/>
<img width="393" alt="캡처1" src="https://user-images.githubusercontent.com/87797481/180237162-0e697cea-71f4-4452-a551-d2e4797d83bc.PNG">
<br/>
Here, the private ip address 192.168.219.108 was found by searching for a device name "Wi-Fi".
<br/>
However, this is just a convenience function that gives you an address. 
<br/>
If you are connected to Wi-Fi, you have no problem accessing it using your private IP address 192.168.219.108 even if you do not specify network interface.
<br/>
Therefore, this property has no effect on the actual functionality.
<br/>
<br/>
The default is Wi-Fi.

## users
In this Setting, you can manage accounts of system.
<br/>
<img width="479" alt="캡처3" src="https://user-images.githubusercontent.com/87797481/180366514-4236c8da-2ab4-4798-8716-2c259131b76c.PNG">
<br/>
In default, there are no accounts in Setting. 
<br/>
In this case, the login check process is omitted and admin privileges are given.
<br/>
<br/>
<br/>
<img width="602" alt="캡처4" src="https://user-images.githubusercontent.com/87797481/180367134-bf6fe578-bfb6-4b8d-8286-f9f99b4d324e.PNG">
<br/>
If you click Add button, you can create new account.
<br/>
<br/>
<br/>
<img width="615" alt="캡처5" src="https://user-images.githubusercontent.com/87797481/180367245-1a54329f-c2cc-4003-a4fc-6bcf04327de2.PNG">
<br/>
Type id,password and admin. you have to set only true or false to admin property.
<br/>
In this case, user, admin account is created. user has Guest Authority and admin has Admin Authority.
<br/>
<br/>
If you want to delete a user, just click delete button on the right.


