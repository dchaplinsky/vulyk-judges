;
var scripts = scripts || {};

scripts.Common = {

	initializeCache: function() {

		var $cache = {};

		$cache.html = $('html');
		$cache.body = $('body');
		$cache.cloneWrapper = $('.js-clone-wrapper');

		this.$cache = $cache;
	},

	detecting: function () {
		this.$cache.html.removeClass('no-js');
	},

	isModernBrowser: function () {
		return 'querySelector' in document && 'localStorage' in window && 'addEventListener' in window
	},

	globalInit: function() {
		this.$cache.body.on('click', ".weiss-form__input-act input[type='checkbox']", function() {
			var self = $(this);

			self.parent().toggleClass('js-ico-checked');
			self.parents('.weiss-form__input-w-ico').toggleClass('weiss-form__input-act_' + self.data('input-type') );
		});
	},

	jsPlaceholderInit: function () {
		$('input[placeholder], textarea[placeholder]').placeholder();
	},

	toggleFormSection: function(enableOnValue) {
		var trueValue = (typeof enableOnValue === "undefined") ? "other" : enableOnValue,
			ctrlInput = $(".js-related-control").find("input[type='checkbox'], select");

		function enabled(el) {
			return (el.value == "other" || el.checked);
		}

		function toggleSection(el, checked) {
			var sectionBlc = el.parents(".js-related-control").next(".js-related-section");

			sectionBlc[checked ? "removeClass" : "addClass"]("i-inputs_disabled");
			sectionBlc.find("input, select, textarea").attr("disabled", !checked);
		}

		ctrlInput.each(function() {
			toggleSection($(this), enabled(this));
		});

		ctrlInput.on('change', function() {
			toggleSection($(this), enabled(this));
		});
	},

	inputActions: function() {
		var $inputs = $('input[data-inp-act], select[data-inp-act], textarea[data-inp-act]');

		$inputs.wrap("<span class='weiss-form__input-w-ico'></span>");
		$('<i class="weiss-form__input-w-ico__ico weiss-form__input-act"></i>').insertAfter($inputs);

		$inputs.each(function() {
			var $input = $(this),
				$inputName = $input.attr('name'),
				$inputActions = $input.data('inp-act').split(',');

			$.each($inputActions, function (key, value) {
				var title;

				switch (value) {
					case "hidden":
						var title = 'Поле містить приховану інформацію';
						break;
					case "unclear":
						var title = 'Поле містить нерозбірливу інформацію';
						break;
				}

				$($input.next('.weiss-form__input-w-ico__ico'))
					.append('<label class="i-weiss-ico i-weiss-ico_'+ value +'" role="button" title="'+ title +'">' +
					'<input type="checkbox" name="'+ $inputName.replace(/\]$/, "") + '_' + value +']" tabindex="-1" data-input-type="' + value +'" /></label>');
			});
		});
	},

	inputActionsReInit: function(container) {
		var input = container.find(".weiss-form__input-act input[type='checkbox']");

		input.each(function() {
			var self =$(this);

			if (self.checked) {
				self.parent().addClass('js-ico-checked');
				self.parents('.weiss-form__input-w-ico').addClass('weiss-form__input-act_' + self.data('input-type') );
			} else {
				self.parent().removeClass('js-ico-checked');
				self.parents('.weiss-form__input-w-ico').removeClass('weiss-form__input-act_' + self.data('input-type') );
			}
		});
	},

	autoCompliteInit: function () {
		var autoCompliteData = {
				".lastname-autocomplete": scripts.Data.autocompliteData.lastname,
				".name-autocomplete": scripts.Data.autocompliteData.firstname,
				".patronymic-autocomplete": scripts.Data.autocompliteData.patronymic,
				".family_relation": scripts.Data.autocompliteData.relation,
			},
			focus_next = function(current) {
				var selectables = $(":input:not(.ui-menu-item, .ui-autocomplete):not(:disabled):not(:checkbox), textarea"),
					nextIndex = 0;

				if (current.length === 1) {
					var currentIndex = selectables.index(current);
					if (currentIndex + 1 < selectables.length) {
						nextIndex = currentIndex + 1;
					}
				}

				selectables.eq(nextIndex).focus();
			},
			addAutoComplite = function (selector, data) {
				var selected = false;

				$(selector).on("focus", function(e) {
					selected = false;
				});

				$(selector).autocomplete({
					delay: 100,
					source: function(request, response) {
						var results = $.ui.autocomplete.filter(data, request.term);
						response(results.slice(0, 7));
					},
					change: function(event, ui) {
						focus_next($(event.target));
					},
					select: function(event, ui) {
						selected = true;
						focus_next($(event.target));
					},
					appendTo: $(selector).parent()
				}).on("keydown", function(e) {
					if (e.which === 9 && !e.shiftKey && selected) {
						e.preventDefault();
					}
				});
			};

		$.each(autoCompliteData, addAutoComplite);

		$('.js-clone-wrapper')
			.on('clone_before_clone', function (event, toclone) {
				$('.js-datepicker').datepicker("destroy");
				$.each(autoCompliteData, function(element, data) {
					var $elem = toclone.find(element);

					if ($elem.length > 0)
						$elem.autocomplete().autocomplete('destroy');
				});
			})
			.on('clone_after_append', function (event, toclone, newclone) {
				var $container = $(newclone).parent('.js-clone-wrapper');

				$('.js-datepicker').datepicker({
					format: 'dd/mm/yyyy',
				});
				$.each(autoCompliteData, function(element, data) {
					var $elem = $container.find(element);

					if ($elem.length > 0) {
						addAutoComplite($elem, data);
					}
				});
			});
	},

	cloneyaInit: function () {
		$('.js-clone-wrapper').cloneya({
			serializeID: false,
			cloneThis: '.js-toclone',
			cloneButton: '.js-clone',
			deleteButton: '.js-clone-delete',
			ignore: '.weiss-form__msg, .js-clone-ignore, .ui-autocomplete'
		});
	},

	dateSelectBoxesInit: function () {
		$().dateSelectBoxes({
			monthElement: $('#declaration__date_month'),
			dayElement: $('#declaration__date_day'),
			yearElement: $('#declaration__date_year'),
			keepLabels: true,
			yearLabel: 'Рік',
			monthLabel: 'Місяць',
			dayLabel: 'День'
		});

		$('.js-datepicker').datepicker({
			format: 'dd/mm/yyyy',
		});
	},

	jqueryValidateInit: function () {

		$.validator.addMethod("lettersonly", function(value, element) {
			return this.optional(element) || /^[а-яА-ЯёЁіІїЇєЄ’`'ґҐa-zA-Z]+$/i.test(value);
		}, "Tільки букви, будь ласка");

		$.validator.addMethod("lastnameonly", function(value, element) {
			return this.optional(element) || /^[а-яА-ЯёЁіІїЇєЄ’`'ґҐa-zA-Z,\-\(\)\ ]+$/i.test(value);
		}, "Tільки букви, будь ласка");

		$.validator.addMethod("fractdigitsonly", function(value, element) {
			return this.optional(element) || /^\d+([.,]\d+)?$/i.test(value);
		}, "Вводити потрібно лише цифри");

		$.validator.addClassRules({
			'js-is-LettersOnly': {
				lettersonly: true
			},
			'js-is-DigitsOnly': {
				fractdigitsonly: true
			},
			'js-is-lastnameonly': {
				lastnameonly: true
			},
			'js-is-strictDigitsOnly': {
				digits: true
			}
		});

		var $form = $('#form-declaration'),
			validateSettings = {
				errorClass: "js-invalid",
				errorElement: "p",
				errorPlacement: function (error, element) {
					if (element.attr('required')) {
						error.insertBefore(element).addClass('weiss-form__msg weiss-form__msg_error');
					} else {
						error.insertBefore(element).addClass('weiss-form__msg weiss-form__msg_warn');
					}
				},
				focusInvalid: false,
				invalidHandler: function(form, validator) {
					if (!validator.numberOfInvalids())
						return;

					$('html, body').animate({
						scrollTop: $(validator.errorList[0].element).offset().top - 60
					}, 200);

				}
			};

		this.$cache.validateThis = $form.validate(validateSettings);

		this.$cache.body.on('reset', $form, function () {
			$form.validate().resetForm();
		}).on('click', '#intro__isnotdeclaration', function () {
			if ($(this).is(':checked')) {
				$form.validate().settings.ignore = "*"; // disable all validation
			} else {
				$form.validate().settings.ignore = "";
			}
		});
	},

	init: function () {
		var scrpt = this;

		scrpt.initializeCache();
		scrpt.detecting();
		scrpt.globalInit();

		$(function () { // DOM Ready
			var template = Handlebars.compile($('#decl_form_template').html()),
				output = $("#form-wrapper");

			function show_loader() {
				output
					.html('<p class="loading-message">Завантажуємо наступне завдання</p>');

				output.find("p.loading-message")
					.fadeIn(700).fadeOut(700).fadeIn(700).fadeOut(700).fadeIn(700).fadeOut(700).fadeIn(700);
			}

			show_loader();

			scrpt.$cache.body.on("vulyk.next", function(e, data) {
				scrpt.$cache.body.scrollTop(0);
				output.html(template(data.result.task.data));
				scrpt.jqueryValidateInit();
				scrpt.toggleFormSection();
				scrpt.inputActions();
				scrpt.autoCompliteInit();
				scrpt.cloneyaInit();
				scrpt.dateSelectBoxesInit();
			}).on("vulyk.save", function(e, callback) {
				var $form = $('#form-declaration'),
					data = $form.serializeJSON();

				if (scrpt.$cache.validateThis.form()) {
					$form.remove();
					show_loader();
					callback(data);
				} else {
					scrpt.$cache.body.scrollTop(0);
					$(".gross-error").show();
					callback();
				}
			}).on("vulyk.skip", function(e, callback) {
				$('#form-declaration').remove();
				show_loader();
				callback();
			});
		});

		return scrpt;
	}
};

scripts.Common.init();
