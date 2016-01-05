describe('loginController', function () {
  var $scope;

  beforeEach(module('myApp'));
  beforeEach(module('AuthService'));

  beforeEach(inject(function ($rootScope, $controller) {
    $scope = $rootScope.$new();
    $controller('CampaignsCtrl', {
      $scope: $scope,
      campaigns: campaigns
    });
  }));

  // to-do
  // it('ensure invalid email addresses are caught', function() {});
  // it('ensure valid email addresses pass validation', function() {});
  // it('ensure submitting form changes path', function() { });

  // $scope.loginForm.username = 'test';
  // $scope.loginForm.password = '1234';

  beforeEach(angular.mock.module('myApp'));

  it('should have a loginController controller', function() {
    expect(App.loginController).toBeDefined();
  });

  it('should get login success',
    inject(function(LoginService, $httpBackend) {

      $httpBackend.expect('POST', 'https://api.mydomain.com/login')
        .respond(200, "[{ success : 'true', id : 123 }]");

      LoginService.login('test', 'password')
        .then(function(data) {
          expect(data.success).toBeTruthy();
      });

      $httpBackend.flush();
    });
  );
});
