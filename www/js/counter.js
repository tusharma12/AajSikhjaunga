(function ($) {
    'use strict';

    $.fn.countChar = function () {

        return this.each(function (i, element) {
            $(element).keyup(function updateCharCounter() {

                var $me = $(this),
          maxLength = parseInt($me.attr('maxlength'), 10),
          charCount = $me.val().length,
          $counter = $me.siblings('.limit');

                var countFlag = maxLength - charCount;

                if (countFlag < 0) {
                    countFlag = 0;
                } else {
                    countFlag = maxLength - charCount;
                }
                $counter.text('limit: ' + maxLength + ' characters. remaining: ' + (maxLength - charCount));
            });
        });
    };
} (jQuery));
