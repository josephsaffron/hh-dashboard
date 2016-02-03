/**
 * Test file for Job: bathtimer
 */

var assert = require ('assert');
bathtimerSUT = require('../bathtimer');

var mockedConfig, mockedDependencies;

describe ('bathtimer test', function(){

  beforeEach(function (done) {
    
    mockedConfig = {
      globalAuth: {
        myconfigKey: {
          username: "myusername",
          password: "secretpassword"
        }
      },
      interval: 20000
    };

    mockedDependencies = {
      logger: console,
      easyRequest : {
        JSON : function (options, cb) {
          cb(null, {});
        }
      }
    };

    done();
  });

  it('should have tests :D', function (done){
    assert.ok(false, 'we don\'t have any tests :(');
    done();
  });

  describe ('config checks', function(){
    it('should check for valid credentials', function (done){
      // there are some nice examples of how to unit tests configuration handling
      // in the Atlassian package:
      // https://bitbucket.org/atlassian/atlasboard-atlassian-package/src/master/jobs
      done();
    });
  });

  describe ('http request example tests', function(){
    it('should handle server errors', function (done){

      mockedDependencies.easyRequest.HTML = function (options, cb){
        cb(null, 'hello from google');
      };

      var config = {};
      bathtimerSUT.onRun(config, mockedDependencies, function(err, data){
        assert.equal('hello from google', data.html, 'expected a different reply from google: ' + data.html);
        done();
      });
    });
  });

});
