/**
 * Job: bathtimer
 *
 * Expected configuration:
 *
 * ## PLEASE ADD AN EXAMPLE CONFIGURATION FOR YOUR JOB HERE
 * { 
 *   myconfigKey : [ 
 *     { serverUrl : 'localhost' } 
 *   ]
 * }
 */

var logger, storage;

module.exports = {

    /**
     * Executed on job initialisation (only once)
     * @param config
     * @param dependencies
     */
    onInit: function (config, dependencies) {
        logger = dependencies.logger;
        storage = dependencies.storage;

        dependencies.app.route( '/jobs/bathtimer/resetBathTimer' ).get( resetBathTimer );

    },

    /**
     * Executed every interval
     * @param config
     * @param dependencies
     * @param jobCallback
     */
    onRun: function (config, dependencies, jobCallback) {

        /*
         1. USE OF JOB DEPENDENCIES

         You can use a few handy dependencies in your job:

         - dependencies.easyRequest : a wrapper on top of the "request" module
         - dependencies.request : the popular http request module itself
         - dependencies.logger : atlasboard logger interface

         Check them all out: https://bitbucket.org/atlassian/atlasboard/raw/master/lib/job-dependencies/?at=master

         */

        var logger = dependencies.logger;
        storage.get('leia', function(err, leia){
           storage.get('levi', function(err,levi){
              jobCallback(null, {
                  "leia": leia,
                  "levi": levi
              });
           });
        });

        /*

         2. CONFIGURATION CHECK

         You probably want to check that the right configuration has been passed to the job.
         It is a good idea to cover this with unit tests as well (see test/bathtimer file)

         Checking for the right configuration could be something like this:

         if (!config.myrequiredConfig) {
         return jobCallback('missing configuration properties!');
         }


         3. SENDING DATA BACK TO THE WIDGET

         You can send data back to the widget anytime (ex: if you are hooked into a real-time data stream and
         don't want to depend on the jobCallback triggered by the scheduler to push data to widgets)

         jobWorker.pushUpdate({data: { title: config.widgetTitle, html: 'loading...' }}); // on Atlasboard > 1.0


         4. USE OF JOB_CALLBACK

         Using nodejs callback standard conventions, you should return an error or null (if success)
         as the first parameter, and the widget's data as the second parameter.

         This is an example of how to make an HTTP call to google using the easyRequest dependency,
         and send the result to the registered widgets.
         Have a look at test/bathtimer for an example of how to unit tests this easily by mocking easyRequest calls

         */
    }
};

function resetBathTimer( request, response ) {
    logger.info( 'Resetting bath timer for ' + request.query.child );
    storage.set(request.query.child, Date.now());
};