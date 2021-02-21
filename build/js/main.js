$(document).ready(function () {

    // slick slider
    if ( $('.main-slider').length) {
        $('.main-slider').slick({
            dots: true,
            prevArrow: '<div class="slick-arrow__left"><img class="slick-arrow__left-icon" src="img/icon/icon-chevron-left-white.png" alt=""></div>',
            nextArrow: '<div class="slick-arrow__right"><img class="slick-arrow__right-icon" src="img/icon/icon-chevron-right-white.png" alt=""></div>',
            infinite: true,
            speed: 700,
            autoplay: true,
            autoplaySpeed: 5000
        });
    }

    if ( $('.slider-users').length) {
        $('.slider-users').slick({
            prevArrow: '<div class="slick-arrow__left"><div class="slick-arrow__left-icon"><span class="glyphicon glyphicon-menu-left"></span></div></div>',
            nextArrow: '<div class="slick-arrow__right"><div class="slick-arrow__right-icon"><span class="glyphicon glyphicon-menu-right"></span></div></div>',
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            speed: 700,
            autoplay: true,
            autoplaySpeed: 3000
        });
    }

    // nav-slider slick slider
    if ( $('#topModalShareNav').length) {
        $('#topModalShareNav').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            prevArrow: '<div class="slick-arrow__left"><div class="slick-arrow__left-icon"><span class="glyphicon glyphicon-menu-left"></span></div></div>',
            nextArrow: '<div class="slick-arrow__right"><div class="slick-arrow__right-icon"><span class="glyphicon glyphicon-menu-right"></span></div></div>',
            dots: false,
            focusOnSelect: true,
        });
    }

    $('#topModalShareNav').on('afterChange', function(event, slick, currentSlide){
        let itemId = $(this).find(`.nav-slider__nav-item[data-slick-index="${currentSlide}"]`).find('a').attr('href');

        $(itemId).get(0).scrollIntoView();
    });

    // Выделение элементов списка kg-list-selectable
    $(document).on('click', '.kg-list-selectable__item', function () {
        $(this).toggleClass('kg-list-selectable__item_active');
    });

    // Tooltips
    $('body').tooltip({
        selector: '[data-toggle=tooltip]'
    });

    //
    $(document).on('click', '.click-input-focus', function () {
        $(this).closest('.form-group').find('.input-focus').select();
    });

    // select2
    let selectOptions = {
        templateResult: function (data) {
            // We only really care if there is an element to pull classes from
            if (!data.element) {
                return data.text;
            }

            let $element = $(data.element);

            let $wrapper = $('<div></div>');
            $wrapper.addClass($element[0].className);

            $wrapper.text(data.text);

            return $wrapper;
        },
        language: {
            noResults: function () {
                return "Ничего не найдено";
            }
        }
    }

    $('.kg-select2').select2(selectOptions);

    $('.modal').on('shown.bs.modal', function () {
        $(this).find('.kg-select2').select2(selectOptions);
    });

    $('[data-toggle="tab"]').on('shown.bs.tab', function () {
        let activeTabId = $(this).attr('data-target');

        $(`${activeTabId}`).find('.kg-select2').select2(selectOptions);
    })

    // select2 при выборе пункта в поле устанавливается значение placeholder
    $('.kg-block-view__menu').on('select2:select', '.kg-select2_placeholder-set', function () {
        $(this).val('').trigger('change');
    });

    // custom top-modal
    $(document).on('click', '[data-toggle="top-modal"]', function () {
        let modalId = $(this).attr('data-target');

        $('#' + modalId).addClass('top-modal_show');
    });

    $(document).on('click', '.top-modal__close', function () {
        $(this).closest('.top-modal').removeClass('top-modal_show');
    });

    $(document).on('click', '.top-modal__backdrop', function () {
        $(this).closest('.top-modal').removeClass('top-modal_show');
    });

    // kg-block-view__menu выдвижной блок с фильтрами
    $('.kg-block-view__menu-btn-filter').on('click', function () {
        $(this).closest('.kg-block-view__menu').find('.kg-block-view__menu-filter').addClass('active');
    });

    $('.kg-block-view__menu-filter-close').on('click', function () {
        $(this).closest('.kg-block-view__menu').find('.kg-block-view__menu-filter').removeClass('active');
    });

    // textarea-autoresize
    $('textarea.textarea-autosize').textareaAutoSize();

    // Блокирование элементов формы
    $(document).on('change', '.kg-switch__onoff-checkbox', function () {
        $(this).closest('.kg-switchable-form-wrap').find('.kg-switchable-form:first').toggleClass('kg-switchable-form_disable').prop('disabled', function(i, v) { return !v; });
    });

    $(document).on('change', '.kg-radio-custom input', function () {
        $(this).closest('.kg-radio-custom-list').find('.kg-switchable-form').addClass('kg-switchable-form_disable').prop('disabled', true);
        $(this).closest('.kg-switchable-form-wrap').find('.kg-switchable-form').removeClass('kg-switchable-form_disable').prop('disabled', false);
    });

    // kg-switch-list. При переключении kg-switch-list__controller переключать все вложенные переключатели kg-switch__onoff-checkbox
    $(document).on('change','.kg-switch-list__controller .kg-switch__onoff-checkbox', function () {
        let containerOfItems = $(this).closest('.kg-switch-list').find('.kg-switch-list__content');

        if ( $(this).prop('checked') ) {
            containerOfItems.find('.kg-switch__onoff-checkbox').prop('checked', true);
        } else {
            containerOfItems.find('.kg-switch__onoff-checkbox').prop('checked', false);
        }
    });

    $(document).on('change', '.kg-switch-list__content .kg-switch__onoff-checkbox', function () {
        $(this).closest('.kg-switch-list').find('.kg-switch-list__controller').find('.kg-switch__onoff-checkbox').prop('checked', true);
    });

    // mask for phone
    $('.input-phone').inputmask({ "mask": "+7 ( 999 ) 999 - 99 - 99"});

    // datepicker init
    $.fn.datepicker.dates['ru'] = {
        days: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
        daysShort: ["Вск", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Суб", "Вск"],
        daysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
        months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        monthsShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
        today: "Сегодня",
        weekStart: 1
    };

    $('.datepicker').datepicker({
        orientation: 'right',
        language: 'ru',
        format: 'dd/mm/yyyy',
        autoclose: true
    });

    // bootstrap slider range
    $('.kg-range-slider__input').bootstrapSlider({
        formatter: function (value) {
            return value;
        }
    });

    // bootstrap slider range стоимость вопроса
    $('.kg-range-slider__input-cost').bootstrapSlider({
        formatter: function (value) {
            return value + ' ₽';
        },
        ticks_labels: ["<p>0 &#8381;</p> <div class='text-muted'>Легкий вопрос</div>", "", "<p>1000 &#8381;</p> <div class='text-muted'>Обычный вопрос </div>", "", "<p>2000 &#8381;</p> <div class='text-muted'>Сложный вопрос</div>"]
    });

    // bootstrap slider range количество юристов
    $('.kg-range-slider__input-lawyers').bootstrapSlider({
        ticks_labels: ["<p>Один юрист</p> <div class='text-muted'>Бесплатно</div>", "<p>Два юриста</p> <div class='text-muted'>+100 &#8381;</div>", "<p>Три юриста и более</p> <div class='text-muted'>+200 &#8381;</div>"]
    });

    // kg-panel показ/скрытие
    $(document).on('click', '.kg-panel-group .kg-panel__header', function () {
        if (!$(this).closest('.kg-panel').hasClass('kg-panel_active')) {
            $(this).closest('.kg-panel').addClass('kg-panel_active');
        } else {
            $(this).closest('.kg-panel').removeClass('kg-panel_active');
        }

        $(this).closest('.kg-panel').find('.kg-panel__body').slideToggle('400').closest('.kg-panel').siblings('.kg-panel').removeClass('kg-panel_active').find('.kg-panel__body').slideUp('400');
        $(this).closest('.kg-panel').find('.kg-panel__body').find('.kg-select2').select2(selectOptions);
        $(this).closest('.kg-panel').find('.kg-range-slider input').bootstrapSlider('relayout');
    });
    
    $(document).on('click', '.kg-panel__body-toggle', function () {
        $(this).closest('.kg-panel').removeClass('kg-panel_active');
        $(this).closest('.kg-panel__body').slideUp('400');
    });

    // kg-categories показ/скрытие содержимого категорий
    $(document).on('click', '.kg-category-item_has-list', function () {
        $(this).next('.kg-category-list').slideToggle('fast').siblings('.kg-category-list').slideUp('fast');
        $(this).siblings('.kg-category-item_has-list').removeClass('kg-category-item_active');
        $(this).toggleClass('kg-category-item_active');
    });

    $('.kg-categories [data-toggle="tab"]').on('show.bs.tab', function (e) {
        $(this).closest('.kg-categories').find('[data-toggle="tab"]').removeClass('active');
        $(this).addClass('active');
    });

    // отметка для checkbox-custom
    $(document).on("click", ".checkbox-custom input", function () {
        $(this).closest(".checkbox-custom").toggleClass("active");
    });

    // отметка для kg-radio-custom
    $(document).on("click", ".kg-radio-custom label", function () {
        $(this).closest(".kg-radio-custom-list").find('.kg-radio-custom').removeClass("kg-radio-custom_active");
        $(this).closest('.kg-radio-custom').addClass("kg-radio-custom_active");
    });

    // отметить все элементы checkbox-custom в списке checkbox-custom-list
    $(document).on('click', '.checkbox-custom-list__controller input', function () {
        if ($(this).prop('checked')) {
            $(this).closest('.checkbox-custom-list').find('.checkbox-custom-list__content').find('.checkbox-custom input').prop('checked', true).closest(".checkbox-custom").addClass("active");
        } else {
            $(this).closest('.checkbox-custom-list').find('.checkbox-custom-list__content').find('.checkbox-custom input').prop('checked', false).closest(".checkbox-custom").removeClass("active");
        }
    });

    $(document).on('click', '.checkbox-custom-list__content .checkbox-custom input', function () {
        $(this).closest('.checkbox-custom-list').find('.checkbox-custom-list__controller input').prop('checked', false).closest(".checkbox-custom").removeClass("active");
    });

    // Анимация переключения кнопки kg-btn-toggle-plus-minus
    $(document).on('click', '.kg-btn-toggle-plus-minus__toggle', function () {
        $(this).toggleClass('kg-btn-toggle-plus-minus_active');
    });

    // Сортируемый список (http://johnny.github.io/jquery-sortable)
    $(".kg-sort-list__main").sortable({
        handle: '.kg-sort-list__mover_main',
        nested: false
    });

    $(".kg-sort-list__sub").sortable({
        group: 'sub-list',
        handle: '.kg-sort-list__mover_sub'
    });

    // ФУНКЦИОНАЛ блока прайс юриста ( = BEGIN = )

    // Элемент Раздел
    let lawyerPriceSection = $(`<li class="kg-sort-list__item kg-sort-list__item-main">
                                <div class="kg-switch-list">
                                    <div class="kg-sort-list__item-header">
                                        <div class="kg-sort-list__item-tools">
                                            <div class="kg-sort-list__mover kg-sort-list__mover_main">
                                                <span class="glyphicon glyphicon-option-vertical"></span>
                                            </div>
                                            <div class="kg-switch kg-switch-list__controller" title="Блокировка раздела">
                                                <div class="kg-switch__onoff">
                                                    <label class="kg-switch__onoff-label">
                                                        <input type="checkbox" name="" class="kg-switch__onoff-checkbox">
                                                        <span class="kg-switch__onoff-inner"></span>
                                                        <span class="kg-switch__onoff-switch"></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex-box align-items-start flex-grow-1">
                                            <div class="kg-sort-list__item-name">
                                                <input class="form-control" type="text" placeholder="Название раздела">
                                                <div class="fs-10">
                                                    <a href="javascript:void(0)" class="kg-lawyer-price__add-section m-r-20 disabled">Создать новый раздел</a>
                                                    <a href="javascript:void(0)" class="kg-lawyer-price__add-subsection disabled" >Добавить услугу</a>
                                                </div>
                                            </div>
                                            <div class="kg-sort-list__item-remove">
                                                <button class="btn btn-clear-all action-remove kg-sort-list__item-main-remove" type="button" title="Удалить раздел"></button>
                                            </div>
                                        </div>
                                    </div>
                                    <ol class="kg-sort-list__sub kg-switch-list__content">
                                        <li class="kg-sort-list__item">
                                            <div class="kg-sort-list__item-tools">
                                                <div class="kg-sort-list__mover kg-sort-list__mover_sub">
                                                    <span class="glyphicon glyphicon-option-vertical"></span>
                                                </div>
                                                <div class="kg-switch" title="Блокировка услуги">
                                                    <div class="kg-switch__onoff">
                                                        <label class="kg-switch__onoff-label">
                                                            <input type="checkbox" name="" class="kg-switch__onoff-checkbox">
                                                            <span class="kg-switch__onoff-inner"></span>
                                                            <span class="kg-switch__onoff-switch"></span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <span class="kg-icon-circle-plus animation-scale-hover kg-lawyer-price__add-subsection" title="Добавить услугу"></span>
                                            </div>
                                            <div class="form-group-sm flex-box justify-cont-between">
                                                <div class="row">
                                                    <div class="col-xs-7">
                                                        <textarea name="" rows="1" class="form-control textarea-autosize" placeholder="Название услуги"></textarea>
                                                    </div>
                                                    <div class="col-xs-2">
                                                        <input class="form-control input-sm" type="text" placeholder="Цена">
                                                    </div>
                                                    <div class="col-xs-3">
                                                        <textarea name="" rows="1" class="form-control textarea-autosize" placeholder="Ед. изм."></textarea>
                                                    </div>
                                                </div>
                                                <button class="btn btn-clear-all action-remove" type="button" title="Удалить"></button>
                                            </div>
                                        </li>
                                    </ol>
                                </div>
                            </li>`);
    // Элемент Подраздел
    let lawyerPriceSubsection = $(`<li class="kg-sort-list__item">
                                        <div class="kg-sort-list__item-tools">
                                            <div class="kg-sort-list__mover kg-sort-list__mover_sub">
                                                <span class="glyphicon glyphicon-option-vertical"></span>
                                            </div>
                                            <div class="kg-switch">
                                                <div class="kg-switch__onoff" title="Блокировка услуги">
                                                    <label class="kg-switch__onoff-label">
                                                        <input type="checkbox" name="" class="kg-switch__onoff-checkbox">
                                                        <span class="kg-switch__onoff-inner"></span>
                                                        <span class="kg-switch__onoff-switch"></span>
                                                    </label>
                                                </div>
                                            </div>
                                            <span class="kg-icon-circle-plus animation-scale-hover kg-lawyer-price__add-subsection" title="Добавить услугу"></span>
                                        </div>
                                        <div class="form-group-sm flex-box justify-cont-between">
                                            <div class="row">
                                                <div class="col-xs-7">
                                                    <textarea name="" rows="1" class="form-control textarea-autosize" placeholder="Название услуги"></textarea>
                                                </div>
                                                <div class="col-xs-2">
                                                    <input class="form-control" type="text" placeholder="Цена">
                                                </div>
                                                <div class="col-xs-3">
                                                    <textarea name="" rows="1" class="form-control textarea-autosize" placeholder="Ед. изм."></textarea>
                                                </div>
                                            </div>
                                            <button class="btn btn-clear-all action-remove" type="button" title="Удалить"></button>
                                        </div>
                                    </li>`);

    // Показать кнопку "Создать прайс лист" елси прайс пустой
    $('.kg-lawyer-price').each(function () {
        let btnCreatePrice = $(this).find('.kg-lawyer-price__create-price');

        if (!$(this).find('.kg-sort-list__item-main').length) {
            btnCreatePrice.show();
        }
    });

    // Добавить раздел первично, когда нет ни одного раздела
    $(document).on('click', '.kg-lawyer-price__create-price', function () {
        let container = $(this).closest('.kg-lawyer-price');
        let list = container.find('.kg-lawyer-price__kg-sort-list');

        lawyerPriceSection.clone().prependTo(list).find('.textarea-autosize').textareaAutoSize().closest('.kg-sort-list__sub').sortable({
            group: 'sub-list',
            handle: '.kg-sort-list__mover_sub'
        });

        container.find('.kg-lawyer-price__create-price').hide();
    });

    // Добавить раздел из созданного раздела
    $(document).on('click', '.kg-lawyer-price__add-section', function () {
        let currentItem = $(this).closest('.kg-sort-list__item-main');

        let newItem = lawyerPriceSection.clone().insertAfter(currentItem);

        newItem.find('.textarea-autosize').textareaAutoSize().closest('.kg-sort-list__item-main').find('.kg-sort-list__sub').sortable({
            group: 'sub-list',
            handle: '.kg-sort-list__mover_sub'
        });

        $('html, body').animate({scrollTop: (newItem.offset().top - 80)},
            {
                duration: 500,
                easing: "swing"
            });

        newItem.find('.kg-sort-list__item-name input').focus();
    });

    // Подсветка удаляемого раздела
    $(document).on('mouseenter', '.kg-sort-list__mover_main, .kg-sort-list__item-remove', function () {
        $(this).closest('.kg-sort-list__item-main').addClass('kg-sort-list__item-main_highlight');
    });

    $(document).on('mouseleave', '.kg-sort-list__mover_main, .kg-sort-list__item-remove', function () {
        $(this).closest('.kg-sort-list__item-main').removeClass('kg-sort-list__item-main_highlight');
    });

    // Удаление раздела
    $(document).on('click', '.kg-sort-list__item-main-remove', function () {
        let container = $(this).closest('.kg-lawyer-price');
        let btnCreatePrice = container.find('.kg-lawyer-price__create-price');

        $(this).closest('.kg-sort-list__item-main').find(".kg-sort-list__sub").sortable('destroy');

        $(this).closest('.kg-sort-list__item').remove();

        if (container.find('.kg-sort-list__item-main').length === 0) {
            btnCreatePrice.show();
        }
    });

    // Удаление подраздела
    $(document).on('click', '.kg-sort-list__sub .kg-sort-list__item .action-remove', function () {
        let sortList = $(this).closest('.kg-sort-list__sub');

        sortList.sortable('destroy');

        $(this).closest('.kg-sort-list__item').remove();

        sortList.sortable({
            group: 'sub-list',
            handle: '.kg-sort-list__mover_sub'
        });
    });

    // Добавить подраздел kg-lawyer-price__add-subsection из вложенного списка kg-sort-list__sub
    $(document).on('click', '.kg-sort-list__item-header .kg-lawyer-price__add-subsection', function () {
        let list = $(this).closest('.kg-sort-list__item-main').find('.kg-sort-list__sub');

        lawyerPriceSubsection.clone().prependTo(list).find('.textarea-autosize').textareaAutoSize();
    });

    // Добавить подраздел kg-lawyer-price__add-subsection из вложенного списка kg-sort-list__sub
    $(document).on('click', '.kg-sort-list__sub .kg-lawyer-price__add-subsection', function () {
        let currentItem = $(this).closest('.kg-sort-list__item');

        lawyerPriceSubsection.clone().insertAfter(currentItem).find('.textarea-autosize').textareaAutoSize();
    });
    // ( = END = ) ФУНКЦИОНАЛ блока прайс юриста ( = END = )

    // ФУНКЦИОНАЛ установки рабочего времени в таблице custom-table-timing ( = BEGIN =)

    // Подсчет количества рабочих часов в таблице custom-table-timing при загрузке
    $('.custom-table-timing').each(function () {
        let workHoursNumbe = $(this).closest('.custom-table-timing').find('tbody').find('.custom-table-timing__toggle_active').length;
        $(this).find('.custom-table-timing__hours-number').text(workHoursNumbe);
    });

    // Функция подсчета количества рабочих часов в таблице custom-table-timing при выборе часов в таблице
    function toCountWorkTime (objTableTiming) {
        let workHoursNumber = objTableTiming.find('tbody').find('.custom-table-timing__toggle_active').length;
        objTableTiming.find('.custom-table-timing__hours-number').text(workHoursNumber);
    }

    // таблица custom-table-timing, отмечаем все элементы custom-table-timing__toggle в строке таблицы
    $(document).on('click', '.custom-table-timing__row-controller input', function () {
        let table = $(this).closest('.custom-table-timing');
        let buttons = $(this).closest('tr').find('.custom-table-timing__toggle');

        if ($(this).prop('checked')) {
            buttons.addClass('custom-table-timing__toggle_active');
        } else {
            buttons.removeClass('custom-table-timing__toggle_active');
        }

        toCountWorkTime(table);
    });

    // таблица custom-table-timing, отмечаем все элементы custom-table-timing__toggle в столбце таблицы
    $(document).on('click', '.custom-table-timing__col-controller input', function () {
        let table = $(this).closest('.custom-table-timing');
        let cellNumber = $(this).closest('td').parent().children().index($(this).closest('td'));
        let rows = $(this).closest('.custom-table-timing').find('tbody').find('tr');

        if ($(this).prop('checked')) {
            rows.each(function () {
                $(this).find(`td:eq(${cellNumber})`).find('.custom-table-timing__toggle').addClass('custom-table-timing__toggle_active');
            });
        } else {
            rows.each(function () {
                $(this).find(`td:eq(${cellNumber})`).find('.custom-table-timing__toggle').removeClass('custom-table-timing__toggle_active');
            });
        }

        toCountWorkTime(table);
    });

    // отмечаем выделенные элементы custom-table-timing__toggle
    $(document).on('mousedown', '.custom-table-timing__toggle', function () {
        let table = $(this).closest('.custom-table-timing');

        $(this).toggleClass('custom-table-timing__toggle_active');

        table.find('.custom-table-timing__toggle').on('mouseover', function () {
            $(this).toggleClass('custom-table-timing__toggle_active');

            toCountWorkTime(table);
        });

        toCountWorkTime(table);
    });

    // отмечаем все элементы custom-table-timing__toggle или отменяем
    $(document).on('click', '.custom-table-timing__select-all', function () {
        let table = $(this).closest('.custom-table-timing');

        if(table.find('tbody').find('.custom-table-timing__toggle_active').length) {
            table.find('tbody').find('.custom-table-timing__toggle').removeClass('custom-table-timing__toggle_active');
            table.find('.checkbox-custom input:checked').trigger('click');
        } else {
            table.find('tbody').find('.custom-table-timing__toggle').addClass('custom-table-timing__toggle_active');
            table.find('.checkbox-custom input:not(:checked)').trigger('click');
        }

        toCountWorkTime(table);
    });

    // Выбрать только рабочее время ( с 9:00 до 18:00 )
    $(document).on('click','.custom-table-timing__select-work-time', function () {
        let table = $(this).closest('.custom-table-timing');

        table.find('.checkbox-custom input:checked').trigger('click');
        table.find('tbody').find('.custom-table-timing__toggle').removeClass('custom-table-timing__toggle_active');
        table.find('tr.custom-table-timing__workday').each(function () {
            $(this).find('td').slice(10, 19).find('.custom-table-timing__toggle').addClass('custom-table-timing__toggle_active');
        });

        toCountWorkTime(table);
    });

    // отмена выделения элементов custom-table-timing__toggle
    $(document).on('mouseup', '.custom-table-timing tbody td', function () {
        let table = $(this).closest('.custom-table-timing');
        table.find('.custom-table-timing__toggle').off();
    });

    $(document).on('mouseover', '.custom-table-timing thead, .custom-table-timing tfoot, .custom-table-timing tbody tr td:first-child', function () {
        let table = $(this).closest('.custom-table-timing');
        table.find('.custom-table-timing__toggle').off();
    });

    $(document).on('mouseleave', '.custom-table-timing', function () {
        $(this).find('.custom-table-timing__toggle').off();
    });
    // ( = END = ) ФУНКЦИОНАЛ установки рабочего времени в таблице custom-table-timing ( = END = )

    // label-sticker удадение
    $(document).on('click', '.label-sticker__close', function () {
        let blockList = $(this).closest('.add-block-list');

        $(this).closest('.label-sticker').remove();

        if (!blockList.find('.add-block').length) {
            blockList.hide();
        }
    });

    // удадение добавляемых элементов add-block
    $(document).on('click', '.add-block .action-remove', function () {
        $(this).closest('.add-block').remove();
    });

    // удаление ВСЕХ add-block из списка add-block-list
    $(document).on('click', '.add-block-list .action-remove-all', function () {
        let blockList = $(this).closest('.add-block-list');
        blockList.find('.add-block').remove();
        blockList.hide();
    });

    // rating only for reading
    let ratingOptions = {
        symbols: {
            utf8_star: {
                base: '\u2605',
                hover: '\u2605',
                selected: '\u2605'
            }
        },
        selected_symbol_type: 'utf8_star',
        max_value: 5,
        step_size: 0.1,
        readonly: true
    }

    $(".js-rating-readonly").rate(ratingOptions);

    // Просмотр миниатюры
    $('.fancybox-gallery .file-attachment__scale').fancybox();

    // Карточка юриста. Избранное добавить - отменить
    $(document).on('click', '.icon-favorites_toggle', function () {
        $(this).toggleClass('icon-favorites_active');
        if ( $(this).hasClass('icon-favorites_active') ) {
            $(this).attr('title', 'Добавлено в избранное');
        } else {
            $(this).attr('title', 'Добавить в избранное');
        }
    });

    //
    let substringMatcher = function (strs) {
        return function findMatches(q, cb) {
            let matches, substringRegex;

            matches = [];

            substrRegex = new RegExp(q, 'i');

            $.each(strs, function (i, str) {
                if (substrRegex.test(str)) {
                    matches.push(str);
                }
            });

            cb(matches);
        };
    };

    let city = ['Москва', 'Красноярск', 'Краснодар', 'Санкт-Питербург'];

    $('#the-basics .typeahead').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        },
        {
            name: 'city',
            source: substringMatcher(city)
        });

    // проверка email
    function isValidEmail(email) {
        if (email.trim() != '') {
            let pattern = /\S+@\S+\.\S+/;

            if (!pattern.test(email)) {
                return false;

            } else {
                return true;
            }

        } else {
            return false;
        }
    }

    $('.kg-input__input[type="email"]').on('input', function () {
        let inputEmail = $(this);
        let emailVal = $(this).val();

        if (isValidEmail(emailVal)) {
            inputEmail.closest('.form-group').removeClass('has-error');
            inputEmail.closest('.form-group').find('.help-block').text('');

        } else {
            inputEmail.closest('.form-group').addClass('has-error');
            inputEmail.closest('.form-group').find('.help-block').text('Заполните корректно адрес электронной почты');
        }
    });

    // поле ввода чисел с кнопками + и -
    $(document).on('input', '.input-group-change-amount input', function () {
        $(this).val(function (index, value) {
            return value.replace(/\D/g, '');
        });
    });

    $(document).on('blur', '.input-group-change-amount input', function () {
        $(this).val('1');
    });

    $(document).on('click', '.input-group-change-amount__minus', function () {
        let input = $(this).closest('.input-group-change-amount').find('input');

        if (input.val() > 1) {
            $(this).closest('.input-group-change-amount').find('input').val(function (index, value) {
                return +value - 1;
            });
        }
    });

    $(document).on('click', '.input-group-change-amount__plus', function () {
        $(this).closest('.input-group-change-amount').find('input').val(function (index, value) {
            return +value + 1;
        });
    });

    // проверка полей, обязательных для заполнения, при вводе данных
    $(document).on("input", "input[data-require='true'], select[data-require='true'], textarea[data-require='true']", function () {
        if ($(this).val().trim() != "") {
            $(this).closest('.form-group').removeClass("has-error");
            $(this).next(".text-danger").remove();
        } else if (!$(this).hasClass("has-error")) {
            $(this).closest('.form-group').addClass("has-error");
            $(this).after(`<small class="text-danger">Поле обязательное для заполнения</small>`);
        }
    });

    // foldable main header when scrolling a window
    let mainHeader = $('#mainHeader');
    let headerCollapesButton = $('#mainHeaderToggle');
    let mainHeaderHeight = mainHeader.outerHeight();

    $(window).scroll(function () {
        if ($(this).scrollTop() > mainHeaderHeight) {
            mainHeader.addClass('main-header_folded');
            headerCollapesButton.addClass('main-header__toggle_visible');
        } else if ($(this).scrollTop() < mainHeaderHeight + 40) {
            headerCollapesButton.removeClass('main-header__toggle_visible');
            mainHeader.removeClass('main-header_folded');
        }
    });

    headerCollapesButton.on('click', function () {
        mainHeader.toggleClass('main-header_folded');
    });

    // button scroll to top
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('#scrollup').fadeIn();
        }
        else {
            $('#scrollup').fadeOut();
        }
    });

    $('#scrollup').on('click', function () {
        $('html, body').animate({scrollTop: 0});
        return false;
    });

    // Загрузка файлов drop-area
    if ($('.kg-drop-area').length) {
        let dropArea = $('.kg-drop-area');
        let dropAreaLay = $(this).find('.kg-drop-area__lay');
        let body = $('body');

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
            body[0].addEventListener(eventName, preventDefaults, false);
            dropArea[0].addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
        }

        function handleDrop() {
            console.log('ok'); // !!!
        }

        dropArea.on('dragenter', function () {
            $(this).addClass('kg-drop-area_active');
        });

        dropAreaLay.on('dragleave', function () {
            $(this).closest('.kg-drop-area').removeClass('kg-drop-area_active');
        });

        dropAreaLay.on('drop', function () {
            $(this).closest('.kg-drop-area').removeClass('kg-drop-area_active');
            handleDrop();
        });
    }

    // Карта на странице профиля юриста
    if ($('#mapLawyerProfile').length) {
        ymaps.ready(function () {
            let myMap = new ymaps.Map("mapLawyerProfile", {
                center: [55.752845, 37.799131],
                zoom: 10,
                controls: []
            });

            let myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                balloonContent: '<div class="fs-12">Москва</div><div class="fs-11">Новогереевская 35, <br> стр.4, офис 305</div>'
            }, {
                hideIconOnBalloonOpen : false,
                balloonPane: 'outerBalloon',
                balloonOffset:[0,-40],
                iconLayout: 'default#image',
                iconImageHref: './img/logo_26x33.png',
                iconImageSize: [26, 33]
            })

            myMap.geoObjects.add(myPlacemark);

            myPlacemark.balloon.open();
        });
    }

    // Загрузка видео на страницу
    $(document).on('click', '.kg-video-install__btn', function () {
        let url = $(this).closest('.kg-video-install').find('.kg-video-install__input').val();
        let p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com)(?:\S+)?$/;

        if ( url.match(p) ) {
            $(this).closest('.kg-video-install').find('.kg-video-install__iframe').attr('src', url);
        }
    });

    $(document).on('click', '.kg-video-install__clear', function () {
        $(this).closest('.kg-video-install').find('.kg-video-install__iframe').attr('src', '');
        $(this).closest('.kg-video-install').find('.kg-video-install__input').attr('value', '').val('');
    });
});