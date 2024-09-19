const { ConfigService } = require('@aws-sdk/client-config-service');

const config = new ConfigService();

// ... (other functions remain largely unchanged)

// Refactored getConfiguration function using async/await
async function getConfiguration(resourceType, resourceId, configurationCaptureTime) {
    try {
        const data = await config.getResourceConfigHistory({ 
            resourceType, 
            resourceId, 
            laterTime: new Date(configurationCaptureTime), 
            limit: 1 
        });
        return data.configurationItems[0];
    } catch (err) {
        throw err;
    }
}

// Refactored getConfigurationItem function using async/await
async function getConfigurationItem(invokingEvent) {
    checkDefined(invokingEvent, 'invokingEvent');
    if (isOverSizedChangeNotification(invokingEvent.messageType)) {
        const configurationItemSummary = checkDefined(invokingEvent.configurationItemSummary, 'configurationItemSummary');
        const apiConfigurationItem = await getConfiguration(
            configurationItemSummary.resourceType,
            configurationItemSummary.resourceId,
            configurationItemSummary.configurationItemCaptureTime
        );
        return convertApiConfiguration(apiConfigurationItem);
    } else {
        checkDefined(invokingEvent.configurationItem, 'configurationItem');
        return invokingEvent.configurationItem;
    }
}

// Refactored Lambda handler using async/await
exports.handler = async (event, context) => {
    checkDefined(event, 'event');
    const invokingEvent = JSON.parse(event.invokingEvent);
    const ruleParameters = JSON.parse(event.ruleParameters);

    try {
        const configurationItem = await getConfigurationItem(invokingEvent);
        let compliance = 'NOT_APPLICABLE';
        if (isApplicable(configurationItem, event)) {
            compliance = evaluateChangeNotificationCompliance(configurationItem, ruleParameters);
        }

        const putEvaluationsRequest = {
            Evaluations: [
                {
                    ComplianceResourceType: configurationItem.resourceType,
                    ComplianceResourceId: configurationItem.resourceId,
                    ComplianceType: compliance,
                    OrderingTimestamp: configurationItem.configurationItemCaptureTime,
                },
            ],
            ResultToken: event.resultToken,
        };

        const data = await config.putEvaluations(putEvaluationsRequest);
        if (data.FailedEvaluations.length > 0) {
            throw new Error(JSON.stringify(data));
        }
        return data;
    } catch (error) {
        throw error;
    }
};
