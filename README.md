# AWS Automation Showcase
This repo contains AWS-related scripts that automate the management of resources within AWS. Either written in Java or Python.  The technologies used to execute the code are Lambda Serverless execution of the functions. Boto3 (AWS SDK for Python): To interact with AWS services.

Look for updates as we continuously add new script examples.

Other downstream services need to be triggered to provide full automation, just as Cloudwatch, Eventbridge, SNS and others.
## Key Features
- Code is written in Java or Python
- Technologies used to write the functions are Python and Java
- Lambda Serverless functions were used to execute the code
- The repo simplifies the process of managing AWS cloud resources

## Scripts

### ec2_start.py
The lambda function code handles starting Ec2 instances using Python with the Boto3 library to interact with Eventbridge.  It requires the ID of each instance and in our example, we trigger it through Eventbridge CloudWatch events using a corn expression to schedule the periodic triggering of the functions.  There are various ways to automate the starts, and in this example we are using environment variables:
- REGION
- RESOURCE_ID

[Other environment variables used in other examples include: (REGION, TAG_KEY, TAG_VALUE)](https://github.com/Difeozo/AWS-Lambda-Automation/)
