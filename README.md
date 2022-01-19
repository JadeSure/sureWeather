# SureWeather Application

### Introduction
This application is built by React with Material UI and SCSS as the front end and Nodejs + MongoDB as the backend, which combined lots of frontend and backend technologies including JWT saved in local storage, hash password in MongoDB, middleware for authGuard, bunch of validation in forms, Chart.js demo rainfall precipitation per minute and the combination of different MUI components combinations.

### Main Page
On the main page, people can access current weather in the AU main city, such as Melbourne, Sydney. The background images will be changed based on current weather conditions, such as a thunderstorm or clear. Users can register accounts to access richer features
![Cloudy](/images/Cloudy.png)
![Sunshine](/images/Sunshine.png)

### Login and Signup
The error handler and reminder handler were written properly. Users have to input the correct email formate. Besides, there is much another validation checking, such as correct username matching password, not the null username and same password1 and password2 during registering...
![Signin](/images/SignIn.png)
![SignUp](/images/SignUp.png)

 
### 7 Days Prediction with Rainfall Percipitation Per Minute
When users log in, it will show 7 days prediction with beautiful UI and animation icons. The most important feature is after you people log in, they can view a rainfall precipitation per minute bar chart. This chart will show predictions for rainfall in the next hour with each minute. With this chart, people can go outside without an umbrella in the proper time period. And the chart is only available during rainy situations, which will be hidden during clear weather situations. The authGuard was handled in the backend middleware. Thus, only if people register personal accounts, they can access this page. If you input a wrong city name and state code, it will remind the user properly. Try other cities and enjoy:).
![seven](/images/seven.png)
![sevenRain](/images/sevenRain.png)