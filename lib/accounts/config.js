// Options
AccountsTemplates.configure({
    defaultLayout: 'public',
    //defaultLayoutRegions: {
    //    nav: 'nav',
    //    footer: 'footer',
    //},
    defaultContentRegion: 'yield',
    showForgotPasswordLink: true,
    overrideLoginErrors: true,
    enablePasswordChange: true,
    hideSignUpLink: true,

    // sendVerificationEmail: true,
    // enforceEmailVerification: true,
    //confirmPassword: true,
    //continuousValidation: false,
    //displayFormLabels: true,
    //forbidClientAccountCreation: true,
    //formValidationFeedback: true,
    //homeRoutePath: '/',
    //showAddRemoveServices: false,
    //showPlaceholders: true,

    negativeValidation: true,
    positiveValidation: true,
    negativeFeedback: false,
    positiveFeedback: true

    // Privacy Policy and Terms of Use
    //privacyUrl: 'privacy',
    //termsUrl: 'terms-of-use',
});


AccountsTemplates.addFields([
    {
        _id: "first",
        type: "text",
        displayName: "First name",
        required: true
    },
    {
        _id: "last",
        type: "text",
        displayName: "Last name",
        required: true
    },
    {
        _id: 'phone',
        type: 'tel',
        displayName: "Phone",
    }
]);



//AT Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
// AccountsTemplates.configureRoute('signUp');










