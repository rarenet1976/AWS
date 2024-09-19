# AWS config automations introduction
This repo contains the script for a Lambda function that implements an AWS config rule. The reason for this is part of the review of the AWS Well Architected Framework, security pillar and best practices involving detection. 

It is a custom rule for AWS Config, specifically checking if EC2 instances are of a particular desired type.

Here's a summary of what it does (config_changes_AWS_Ec2_v1.js):

- It sets up an AWS Config service client
- The main handler function processes events from AWS Config
- It evaluates whether EC2 instances are compliant based on their instance type
- The code handles two types of AWS Config notifications:
    - Regular configuration change notifications
    - Oversized change notifications

- For oversized notifications, it fetches the full configuration item using the AWS Config API
- It determines if the evaluation is applicable to the resource (only for EC2 instances that are active)
- The compliance check compares the actual instance type with a desired instance type specified in the rule parameters
- It then reports the compliance status back to AWS Config using the putEvaluations API call

In our example, we have an SNS notification triggering a SNS notification.

The code includes several helper functions for:
- Checking if variables are defined
- Converting API responses to a specific format
- Determining if a notification is oversized
- Fetching configuration history
- Evaluating compliance

There are other methods of implementating this type of validation and can include remediation steps as well.

## Key Features
- Code was written in Node.js 12.x and the upgraded version has been created but not tested (see config_changes_AWS_Ec2_v2)
- It uses AWS SDK v2 (which this code uses) and is still supported as far as Node.js 20.x as last verified
- Error handling is used using callbacks

## Note
config_changes_AWS_Ec2_v2.js is the updated javascript code to Node.js 20.x but was not tested up to this date

