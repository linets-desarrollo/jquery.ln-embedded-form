;
(function ($) {
    'use strict';

    $.fn.embeddedForms = function (options) {
        var defaults = {
            class: {
                row: 'embedded-form-row',
                active: 'embedded-form-active',
                delete: 'embedded-form-row-delete'
            },
            template: {
                newFormButton: '<a href="#" class="btn btn-sm btn-success fa fa-plus"></a>',
                deleteFormButton: '<a href="#" class="btn btn-xs btn-danger fa fa-minus"></a>',
                deleteFormButtonContainer: '<div class="col-md-12 embedded-form-row-delete"></div>'
            },
            delete: {
                confirm: true
            }
        };

        var settings = $.extend(true, {}, defaults, options);

        var addNewFormButton = function ($container) {
            var $button = $(settings.template.newFormButton);

            $button.on('click', function (e) {
                e.preventDefault();
                addNewForm($container, $button);
            });

            $container.append($button);
        };

        var addDeleteFormButton = function ($container) {
            var $buttonContainer = $(settings.template.deleteFormButtonContainer);
            var $button = $(settings.template.deleteFormButton);

            $container.append($buttonContainer.prepend($button));

            $button.on('click', function (e) {
                e.preventDefault();

                if (settings.delete.confirm) {
                    if (confirm('¿Esta seguro?')) {
                        $container.remove();
                    }
                } else {
                    $container.remove();
                }
            });
        };

        var addNewForm = function ($collectionHolder, $addNewFormButton) {
            var prototype = $collectionHolder.data('prototype');
            var prototypeName = $collectionHolder.data('prototypeName');
            var index = $collectionHolder.data('index');

            if (prototypeName) {
                var pattern = new RegExp(prototypeName, 'g');
                var $newEmbedFormContainer = $(prototype.replace(pattern, index));
            } else {
                var $newEmbedFormContainer = $(prototype.replace(/__name__/g, index));
            }

            $collectionHolder.data('index', index + 1);

            $addNewFormButton.before($newEmbedFormContainer);

            addDeleteFormButton($newEmbedFormContainer);
        };

        return $(this).not('.' + settings.class.active).each(function () {
            var $container = $(this);

            $container.addClass(settings.class.active);

            addNewFormButton($container);

            $container.data('index', $container.find('.' + settings.class.row).length);

            $container.find('.' + settings.class.row).each(function () {
                if ($(this).find('.' + settings.class.delete).length === 0) {
                    addDeleteFormButton($(this));
                }
            });
        });
    };
}(jQuery));