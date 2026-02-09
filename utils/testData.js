const TestData = {
  users: {
    standardUser: {
      username: 'standard_user',
      password: 'secret_sauce',
    },
    lockedOutUser: {
      username: 'locked_out_user',
      password: 'secret_sauce',
    },
    performanceGlitchUser: {
      username: 'performance_glitch_user',
      password: 'secret_sauce',
    },
  },
  errorMessages: {
    lockedOut: 'Epic sadface: Sorry, this user has been locked out.',
  },
  checkoutInfo: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345',
  },
  successMessage: 'Thank you for your order!',
};

module.exports = TestData;