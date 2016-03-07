widget = {

    onInit: function( el ) {

        $( '#levibath', el ).click( function() {
            $.get( '/jobs/bathtimer/resetBathTimer?child=levi' );
            $('#levibath', el).html('0 Days');

        });

        $( '#leiabath', el ).click( function() {
            $.get( '/jobs/bathtimer/resetBathTimer?child=leia' );
            $('#leiabath', el).html('0 Days');
        });
    },

    //runs when we receive data from the job
    onData: function (el, data) {

        //The parameters our job passed through are in the data object
        //el is our widget element, so our actions should all be relative to that
        if (data.title) {
            $('h2', el).text(data.title);
        }
        var levidays = (Date.now() - data.levi)/86400000;
        var leiadays = (Date.now() - data.leia)/86400000;
        $('#levibath', el).html(Math.round(levidays) + ' days');
        $('#leiabath', el).html(Math.round(leiadays) + ' days');
    }
};