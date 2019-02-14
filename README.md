# A chrome extension that prevents users from downloading executable files in Chrome browser 

### It monitors each file downloaded in Chrome and use a cloud service to determine the downloaded file type. The extension invokes API Gateway on AWS cloud service which invokes lambda function which determines if the file is an executable one.

### Installation 
* Clone the repo
* Go to chrome://extensions and enable developer mode. 
* Click "Load unpacked extension..."
* Select "chromeExtension" directory form this project

![alt text](/resources/images/extension.PNG)

* Click on details and open extension options

![alt text](/resources/images/extension_options.png)
