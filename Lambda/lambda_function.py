### Required Libraries ###
from datetime import datetime
from dateutil.relativedelta import relativedelta
import logging

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

### Functionality Helper Functions ###
def parse_int(n):
    """
    Securely converts a non-integer value to integer.
    """
    try:
        return int(n)
    except ValueError:
        return float("nan")

def build_validation_result(is_valid, violated_slot, message_content):
    """
    Define a result message structured as Lex response.
    """
    if message_content is None:
        return {"isValid": is_valid, "violatedSlot": violated_slot}

    return {
        "isValid": is_valid,
        "violatedSlot": violated_slot,
        "message": {"contentType": "PlainText", "content": message_content},
    }

### Dialog Actions Helper Functions ###
def get_slots(intent_request):
    """
    Fetch all the slots and their values from the current intent.
    """
    return intent_request["currentIntent"]["slots"]


def elicit_slot(session_attributes, intent_name, slots, slot_to_elicit, message):
    """
    Defines an elicit slot type response.
    """

    return {
        "sessionAttributes": session_attributes,
        "dialogAction": {
            "type": "ElicitSlot",
            "intentName": intent_name,
            "slots": slots,
            "slotToElicit": slot_to_elicit,
            "message": message,
        },
    }

def delegate(session_attributes, slots):
    """
    Defines a delegate slot type response.
    """

    return {
        "sessionAttributes": session_attributes,
        "dialogAction": {"type": "Delegate", "slots": slots},
    }

def close(session_attributes, fulfillment_state, message):
    """
    Defines a close slot type response.
    """

    response = {
        "sessionAttributes": session_attributes,
        "dialogAction": {
            "type": "Close",
            "fulfillmentState": fulfillment_state,
            "message": message,
        },
    }

    return response

def validate_data(first_name, age, income_amount, debt_amount, investment_amount, risk_level, intent_request):
    
    # The 'firstName' should only contain letters and no numbers or special characters. Creating this validation also changing the slot type to AMAZON.AlphaNumeric instead of AMAZON.US.First_Name
    if first_name is not None:
        if not first_name.isalpha():
            return build_validation_result(False, 'firstName', "Please type your first name again. This should only consists of letters, and it cannot include numbers and/or special characters.")

    # The `age` should be greater than zero and less than 65.
    if age is not None:
        age = parse_int(age)
        if age <= 0:
            return build_validation_result(False, 'age', "Your age is invalid. Please provide a different age.")
        elif age >= 65:
            return build_validation_result(False, 'age', "You do not qualify to use this service because you are at the retirement age. Please provide a different age.")
      
    # The `income_amount` should be equal to or greater than 130000.
    if income_amount is not None:
        income_amount = parse_int(income_amount)
        is_income_amount_valid = income_amount >= 130000
        if not is_income_amount_valid:
            violatedSlot = "incomeAmount"
            message = "The amount you entered did not qualify for this service. We require a minimum of $130,000 annual income. Please enter a new income amount." 
            return build_validation_result(is_income_amount_valid, violatedSlot, message)

    # The `debt_amount` should not be more than 30% of the annual `income_amount`.        
    if debt_amount is not None:
        debt_amount = parse_int(debt_amount)
        debt_percentage = 0.3
        debt_from_income_amount = income_amount * debt_percentage
        is_debt_amount_valid = debt_amount <= debt_from_income_amount
        if not is_debt_amount_valid:
            violatedSlot = "debtAmount"
            message = f"Your debt-to-income ratio is greater than the average. To qualify for this service, your debt needs to be less than {int(debt_percentage*100)}% of your income. Please enter a different amount." 
            return build_validation_result(is_debt_amount_valid, violatedSlot, message)

    # The `investment_amount` should be equal to or greater than 25000.
    if investment_amount is not None:
        investment_amount = parse_int(investment_amount)
        is_investment_amount_valid = investment_amount >= 25000
        if not is_investment_amount_valid:
            violatedSlot = "investmentAmount"
            message = "The amount you entered did not qualify for this service. We require a minimum of $25,000 investment. Please enter a new investment amount." 
            return build_validation_result(is_investment_amount_valid, violatedSlot, message)
    
    if risk_level is not None:
        risk_level = parse_int(risk_level)
        violatedSlot = "riskLevel"
        if risk_level < 0 or risk_level > 10:
            return build_validation_result(False, violatedSlot, "Your risk level is invalid, please input your risk between 0 to 10. (0- no risk, 1 to 4- conservative, 5 to 7- moderate, and 8 to 10- aggressive)")
    
    return build_validation_result(True, None, None)

def investment_recommendation(risk_level):
    recommendation_result = ''
    risk_level = parse_int(risk_level)
    if risk_level == 0:
        recommendation_result = 'Your risk level tolerance is zero or no risk.'
    elif risk_level > 0 and risk_level <= 4:
        recommendation_result = 'Your risk level tolerance is conservative.'
    elif risk_level >= 5 and risk_level <= 7:
        recommendation_result = 'Your risk level tolerance is moderate.'
    elif risk_level >= 8 and risk_level <= 10:
        recommendation_result = 'Your risk level tolerance is aggressive.'
    else:
        recommendation_result = 'Invalid input. Please input your risk between 0 to 10. (0- no risk, 1 to 4- conservative, 5 to 7- moderate, and 8 to 10- aggressive)'
    return recommendation_result

### Intents Handlers ###
def robodiversification_portfolio(intent_request):
    """
    Performs dialog management and fulfillment for recommending a portfolio.
    """

    input_first_name = get_slots(intent_request)["firstName"]
    input_age = get_slots(intent_request)["age"]
    input_income_amount = get_slots(intent_request)["incomeAmount"]
    input_debt_amount = get_slots(intent_request)["debtAmount"]
    input_investment_amount = get_slots(intent_request)["investmentAmount"]
    input_risk_level = get_slots(intent_request)["riskLevel"]
    source = intent_request["invocationSource"]
    
    if source == 'DialogCodeHook':
        slots = get_slots(intent_request)
        validation_result = validate_data(input_first_name, input_age, input_income_amount, input_debt_amount, input_investment_amount, input_risk_level, intent_request)
     
        if not validation_result['isValid']:
            slots[validation_result['violatedSlot']] = None
            return elicit_slot(intent_request['sessionAttributes'],
                intent_request['currentIntent']['name'],
                slots, 
                validation_result['violatedSlot'],
                validation_result['message'])
        output_session_attributes = intent_request['sessionAttributes'] if intent_request['sessionAttributes'] is not None else {}
        return delegate(output_session_attributes, get_slots(intent_request))
    
    recommendation_result = investment_recommendation(input_risk_level)
    
    return close(intent_request['sessionAttributes'],
                 'Fulfilled',
                 {'contentType': 'PlainText',
                  'content': 'Great, {}! We confirmed that you picked a risk level of {}. {} Please check out your potential portfolio on our website. Thank you for using our RoboAdvisor service!'.format(input_first_name, input_risk_level, recommendation_result)})

### Intents Dispatcher ###
def dispatch(intent_request):
    """
    Called when the user specifies an intent for this bot.
    """

    intent_name = intent_request["currentIntent"]["name"]

    # Dispatch to bot's intent handlers
    if intent_name == "RoboAdvisorDiversification":
        return robodiversification_portfolio(intent_request)

    raise Exception("Intent with name " + intent_name + " not supported")

### Main Handler ###
def lambda_handler(event, context):
    """
    Route the incoming request based on intent.
    The JSON body of the request is provided in the event slot.
    """
    logger.debug('event.bot.name={}'.format(event['bot']['name']))
    #return dispatch(event)
    response = dispatch(event)
    logger.debug(response)
    return response
