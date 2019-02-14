# A chrome extension that prevents users from downloading files in Chrome browser according to their requirements

### It monitors each file downloaded in Chrome and use a cloud service to determine the downloaded file type. The extension invokes API Gateway on AWS cloud service which invokes lambda function which determines if the file is an executable one.

### Installation 
* Clone the repo
* Go to chrome://extensions and enable developer mode. 
* Click "Load unpacked extension..."
* Select "chromeExtension" directory form this project

![alt text](/resources/images/extension.PNG)

* Click on details and open extension options

![alt text](/resources/images/extension_options.png)


* Click on "New Rule" button, add ".exe" extension in order to block download of executable files.

![alt text](/resources/images/executable_extension.PNG)
