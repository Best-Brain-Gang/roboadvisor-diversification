
<head>
  <base href="">
</head>

<p align="center">
<img src="./Images/roboadvisor_diversification_portfolio.png" alt="Twitter Sentiment and ATVI" width="900" height="400"> 
</p>

<p>&nbsp;</p>


## Table of Contents

[Disclaimer](https://github.com/Best-Brain-Gang/roboadvisor-diversification#disclaimer)

[Project Overview](https://github.com/Best-Brain-Gang/roboadvisor-diversification#project-overview)

[Technologies](https://github.com/Best-Brain-Gang/roboadvisor-diversification#technologies)

[Installation Guide](https://github.com/Best-Brain-Gang/roboadvisor-diversification#installation-guide)

[Usage](https://github.com/Best-Brain-Gang/roboadvisor-diversification#usage)

[Examples](https://github.com/Best-Brain-Gang/roboadvisor-diversification#examples)

[Presentation Deck](https://github.com/Best-Brain-Gang/roboadvisor-diversification#presentation-deck)

[Contributors](https://github.com/Best-Brain-Gang/roboadvisor-diversification#contributors)

[License](https://github.com/Best-Brain-Gang/roboadvisor-diversification#license)

---
## **Disclaimer**

The content contained in this project is for informational purposes only. You should not construe any such information or other material (the “Materials”) as investment, ﬁnancial, tax, legal or other advice. The Materials are not investment advice and any observations concerning any security, trading algorithm or investment strategy provided in the project is not a recommendation to buy, sell or hold such investment or security or to make any other investment decisions. The contributors in this project do not provide any advice regarding the nature, potential value, risk or suitability of any particular investment strategy, trading algorithm, transaction, security or investment. Any use of the Materials, and any decisions made in reliance thereon, including any trading or investment decisions or strategies, are made at your own risk. You should seek the advice of a competent, licensed professional if you require investment, trading or other advice. The contributors of this project is not authorized to provide any professional advice in connection with this project and any such advice. Nothing contained in the Materials constitutes a solicitation, recommendation, endorsement, or any third party service provider to buy or sell any securities or other ﬁnancial instruments in this or in any other jurisdiction whether or not such solicitation or offer would be unlawful under the securities laws of such jurisdiction.

---
# RoboAdvisor Diversification Portfolio

## Project Overview

This project is about creating a RoboAdvisor diversification portfolio for users looking to understand their investment portfolio recommendation. It gives the users some idea on the mix of ETFs that they should invest in depending on their investment criteria as well level of risk. This project has been launched with the use of AWS Lex and React so users can have a smoother experience. A live demo of the frontend hooked up to the AWS Lex chatbot can be found [here](https://roboadvisor-diversification.surge.sh/).

---

## Technologies

This project leverages **[python version 3.8.5](https://www.python.org/downloads/)** with the following packages and modules:

* [pandas](https://pandas.pydata.org/docs/) - This was used to be able to easily manipulate dataframes.

* [datetime](https://docs.python.org/3/library/datetime.html)

  *  [dateutil](https://dateutil.readthedocs.io/en/stable/index.html)

* [AWS Lambda](https://aws.amazon.com/lambda/) - To build the functionality for the tool.

* [AWS Lex](https://aws.amazon.com/lex/) - A service for building conversational interfaces into any application using voice and text. This was used in combination with the functionality created on AWS Lambda.
 
* [Logging](https://docs.python.org/3/howto/logging.html)

* [Numpy](https://numpy.org/) - This provides the ability to work with arrays and use different mathematical calculations on arrays.

* [Yahoo API](https://pypi.org/project/fix-yahoo-finance/0.1.30/) - This was used to be able to get closing prices for the ETFs that we will be using in the list of  investments.

* [Alpaca Trade API](https://alpaca.markets/docs/) -  This is used to get API trading data for this project. To have access to Alpaca's API key and API secret keys, the user needs to register for personal account and save their own keys.

* [Scikit Learn](https://scikit-learn.org/stable/) - *version 0.24.2* - This package has a lot of different tools and model that could be use to create a machine learning model.

    * [linear model](https://scikit-learn.org/stable/modules/linear_model.html) - This allows the model to call the Logisitic Regression model to run our machine learning.

    * [train test split](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.train_test_split.html) 

    *  [Standard Scaler](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.StandardScaler.html) - Standardize features by removing the mean and scaling to unit variance.


* [Jupyter Lab](https://jupyterlab.readthedocs.io/en/stable/) - This was used to be able to create and share documents that contain live code, equations, visualizations and narrative text.

* [Numpy](https://numpy.org/) - This provides the ability to work with arrays and use different mathematical calculations on arrays.

* [TensorFlow](https://www.tensorflow.org/) - *version 2.6.0* - This is an end-to-end open source platform for machine learning. It has a comprehensive, flexible ecosystem of tools, libraries, and community resources that lets researchers push the state-of-the-art in ML and developers easily build and deploy ML-powered applications.

    * [Dense](https://www.tensorflow.org/api_docs/python/tf/keras/layers/Dense)

    * [Dropout](https://www.tensorflow.org/api_docs/python/tf/keras/layers/Dropout)

* [Keras](https://keras.io/) - *version 2.6.0* - This is an API designed for human beings, not machines. Keras follows best practices for reducing cognitive load: it offers consistent & simple APIs, it minimizes the number of user actions required for common use cases, and it provides clear & actionable error messages. It also has a free open source Python library for developing and evaluating deep learning models.

     * [models Sequential](https://keras.io/guides/sequential_model/) - This is used appropriately for a plain stack of layers where each layer has exactly one input tensor and one output tensor.

* [React](https://reactjs.org/) - We used this to create a frontend user website that the user can interactive with the RoboAdvisor Diversification chatbot.

* [TQDM](https://github.com/tqdm/tqdm) - We used this library to create a progress bar for Python for easy viewing when loading models.
---
## Installation Guide

### 1. Installing and Running Jupyter notebook

On the terminal, under the conda dev environment, type the code below:

`pip install jupyterlab`

#### * Opening Jupyter notebook

If you have Jupyter Lab already installed, to open your Notebook and be able to view your hidden files, please type this while on your conda dev environment:

`jupyter lab --ContentsManager.allow_hidden=True` 

Once you click ENTER, this will open on your default browser, which will allow you to read the .ipynb file.

---

### 2. Installing Scikit-learn
- To install the Scikit-learn, check that your development environment is active, and then run the following command:

    `pip install -U scikit-learn`

- To check if scikit-learn is already installed, you can run the following code on your dev environment:

    `conda list scikit-learn`

---

### 3. Installing TensorFlow (TF) 
- To install the TensorFlow, check that your development environment is active, and then run the following command:

    `pip install --upgrade tensorflow`

- To verify if TensorFlow is already installed, you can run the following code on your dev environment:

    `python -c "import tensorflow as tf;print(tf.__version__)"`

---

### 4. Keras

- To verify if Keras is already installed, you can run the following code on your dev environment:

    `python -c "import tensorflow as tf;print(tf.keras.__version__)"`

---

### 5. Create [AWS](https://aws.amazon.com/) free account to access AWS Lambda and AWS Lex.  Use VSCODE to view and edit lambda_function.py file.

---

### 6. To install ReactJS on your machine, please go to your dev environment and type below, but make sure the location is where you have a cloned of the this repo:

```
  npm install
  npm start
  npm install -g serve
  serve -s build
```
- Once built, a html website address will show, see pic below. You'll need to copy and paste this on your browser to view the user interface. It may have a different local host number than the photo.

   <img src="./Images/reactlink.png" alt="ReactJS Website" width="300" height="150"> 

- Additionally you might need an Alpaca API key to run the React website. It'd be best to create an .env file with this file name:
    ```
    REACT_APP_API_KEY=
    REACT_APP_APCA_API_SECRET_KEY=
    ```
---

### 7. To install the Yahoo Finance API, please type below on your dev environment:
`pip install yfinance --upgrade --no-cache-dir`

---

## Usage

### 1. To use the AWS Lambda function:

- Go to AWS Lambda first. Create a new Lambda function from scratch, and name it `roboAdvisorDiversification`. Choose Python 3.7 as the runtime programming language.

- In the online code editor, delete the AWS-generated default lines of code, and then paste the new `lambda_function.py` that is provided with this file. 

---
### 2. To use the AWS Lex Chatbot, our RoboAdvisor Diversification:

1. The user needs to input an utterance first i.e *"I want to invest."*, then it will prompt to input his/her first name.
2. Then, it will ask for your age. Your age needs to be below the retirement age. 
3. Then, it will ask how much amount your annual income is, which needs to be at least $130,000.
4. Then, it will ask how much your annual debt is, which needs to be 30% less than your annual income.
5. Then, it will ask how much you would like to invest, which needs to be at least $25,000.
6. Then, once you make a confirmation to proceed, the user can check their portfolio on the React website.


---

## Examples

Here are some of the example of the project:

1. AWS RoboAdvisor Chatbot 
    
    ![AWS RoboAdvisor Chatbot](./Images/awschatbot.gif)

2. Sample Random Portfolios 

    ![Markowitz portfolio](./Images/markowitz_portfolios.png)

3. Sample React Website

    ![React website](./Images/reactwebsite.gif)
---
## **Presentation Deck**

### Click [**HERE**](https://github.com/Best-Brain-Gang/roboadvisor-diversification/blob/main/Presentation_deck/RoboAdvisor_Diversification_Portfolio.pdf) to learn more from our presentation.

[![RoboAdvisor Diversification Deck](./Images/presentationdeck_project3.png)](https://github.com/Best-Brain-Gang/roboadvisor-diversification/blob/main/Presentation_deck/RoboAdvisor_Diversification_Portfolio.pdf)

---

## Contributors

### UW FinTech Bootcamp

#### Colin Benjamin [![Linkedin](https://i.stack.imgur.com/gVE0j.png)](https://www.linkedin.com/in/colinbenjamin/) &nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp; Justine Cho [![Linkedin](https://i.stack.imgur.com/gVE0j.png)](https://www.linkedin.com/in/justinecho) &nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp; Christopher Henderson [![Linkedin](https://i.stack.imgur.com/gVE0j.png)](https://www.linkedin.com/in/chris-henderson123/) &nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp; Nathan Patterson [![Linkedin](https://i.stack.imgur.com/gVE0j.png)](https://www.linkedin.com/in/natepatterson/) 

---

## License

### **MIT License**

Copyright (c) [2021] [UW Fintech Bootcamp: Colin Benjamin | Justine Cho | Chris Henderson | Nathan Patterson]


Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
