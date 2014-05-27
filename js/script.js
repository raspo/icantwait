var countdown           = (function(){

    var targetTime      = null,
        timeout         = null,
        bindings        = {
            seconds     : null,
            minutes     : null,
            hours       : null,
            days        : null
        },
        current         = {
            seconds     : null,
            minutes     : null,
            hours       : null,
            days        : null
        },
        update          = function(){
            timeout = setTimeout(function(){
                update();
            }, 1000);

            var currentTime = new Date(),
                diff        = new Date(targetTime - currentTime),
                seconds     = diff.getSeconds(),
                minutes     = diff.getMinutes(),
                hours       = diff.getHours(),
                days        = Math.floor( diff / (1000 * 60 * 60 * 24) );

            // if the event is in the past
            if( diff.getTime() < 0 ){
                seconds     = 0;
                minutes     = 0;
                hours       = 0;
                days        = 0;

                clearTimeout(timeout);
            }

            setTime('days', days);
            setTime('hours', hours);
            setTime('minutes', minutes);
            setTime('seconds', seconds);
        },
        bindElements    = function(selector){
            $(selector).each(function(){
                var bindName = $(this).data('bind');
                if( bindName && (bindings[ bindName ] !== undefined) ){
                    bindings[ bindName ] = $(this);
                }
            });
        },
        setTime         = function(bindName, newValue){
            newValue = newValue + '';
            newValue = ( newValue.length === 1 ) ? '0'+newValue : newValue;

            if( newValue !== current[ bindName ] ){
                current[ bindName ] = newValue;
                bindings[ bindName ].text( newValue );
            }
        },
        start           = function(params){
            params = params || {};
            params.selector     = params.selector || '.countdownEl';
            params.datestring   = params.datestring || ('12/31/' + (new Date()).getFullYear());

            targetTime  = new Date( params.datestring );

            bindElements( params.selector );

            update();
        };

    return {
        start   : start
    };

}());

jQuery(document).ready(function($){

    countdown.start({
        datestring  : '12/31/2014'
    });

});