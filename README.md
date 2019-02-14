# A chrome extension that prevents users from downloading executable files in Chrome browser 

It monitors each file downloaded in Chrome and use a cloud service to determine the downloaded file type. The extension invokes API Gateway on AWS cloud service which invokes lambda function which determines if the file is an executable one.


Clone the repo
Go to chrome://extensions
Click "Load unpacked extension..."
Select "plugin" directory form this project
