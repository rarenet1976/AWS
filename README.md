# AWS Automation Showcase
This repo contains AWS-related scripts that automate the management of resources within AWS. Either written in Java or Python.  The technologies used to execute the code are Lambda Serverless execution of the functions. Boto3 (AWS SDK for Python): To interact with AWS services.

Look for updates as we continuously update the repository with proven code used within environments.

Other downstream services need to be triggered to provide full automation, just as Cloudwatch, Eventbridge, SNS and others.
## Key Features
- Code is written in Java or Python
- Technologies used to write the functions are Python and Java
- Lambda Serverless functions were used to execute the code
- The repo simplifies the process of managing AWS cloud resources

## Scripts

### ec2_start.py
The lambda function code handles starting Ec2 instances using Python with the Boto3 library to interact with Eventbridge.  It required the ID of each instance  
