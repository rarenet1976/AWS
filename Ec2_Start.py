import boto3
from typing import List, Dict, Any

region: str = '<REGION_ID>'
instances: List[str] = ['<INSTANCE_ID>']
ec2 = boto3.client('ec2', region_name=region)

def lambda_handler(event: Dict[str, Any], context: Any) -> None:
    ec2.stop_instances(InstanceIds=instances)
    print(f'stopped your instances: {instances}')
