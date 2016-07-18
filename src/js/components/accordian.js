(function ($) {

  'use strict';

  // Vars
  var accordian = $('.accordian'),
    accordianHeader = $('.accordian__header'),
    accordianContent = $('.accordian__content'),
    showOneAnswerAtATime = false;

  /**
   * Save question focus
   */
  var saveFocus = function (elem, thisAccordianHeaders) {

    // Reset other tab attributes
    thisAccordianHeaders.each(function () {
      $(this).attr('tabindex', '-1');
      $(this).attr('aria-selected', 'false');
    });

    // Set this tab attributes
    elem.attr({
      'tabindex': '0',
      'aria-selected': 'true'
    });

  };

  /**
   * Show answer on click
   */
  var showHeader = function (elem, thisAccordianHeaders) {
    var thisFaqAnswer = elem.next();

    // Save focus
    saveFocus(elem, thisAccordianHeaders);

    // Set this tab attributes
    if (thisFaqAnswer.hasClass('accordian__content--show')) {
      // Hide answer
      thisFaqAnswer.removeClass('accordian__content--show');
      elem.attr('aria-expanded', 'false');
      thisFaqAnswer.attr('aria-hidden', 'true');
    } else {
      if (showOneAnswerAtATime) {
        // Hide all answers
        accordianContent.removeClass('accordian__content--show').attr('aria-hidden', 'true');
        accordianHeader.attr('aria-expanded', 'false');
      }

      // Show answer
      thisFaqAnswer.addClass('accordian__content--show');
      elem.attr('aria-expanded', 'true');
      thisFaqAnswer.attr('aria-hidden', 'false');
    }
  };

  /**
   * Keyboard interaction
   */
  var keyboardInteraction = function (elem, e, thisAccordianHeaders) {
    var keyCode = e.which,
      nextQuestion = elem.next().next().is('dt') ? elem.next().next() : false,
      previousQuestion = elem.prev().prev().is('dt') ? elem.prev().prev() : false,
      firstQuestion = elem.parent().find('dt:first'),
      lastQuestion = elem.parent().find('dt:last');

    switch(keyCode) {
    // Left/Up
    case 37:
    case 38:
      e.preventDefault();
      e.stopPropagation();

      // Check for previous question
      if (!previousQuestion) {
        // No previous, set focus on last question
        lastQuestion.focus();
      } else {
        // Move focus to previous question
        previousQuestion.focus();
      }

      break;

    // Right/Down
    case 39:
    case 40:
      e.preventDefault();
      e.stopPropagation();

      // Check for next question
      if (!nextQuestion) {
        // No next, set focus on first question
        firstQuestion.focus();
      } else {
        // Move focus to next question
        nextQuestion.focus();
      }

      break;

    // Home
    case 36:
      e.preventDefault();
      e.stopPropagation();

      // Set focus on first question
      firstQuestion.focus();
      break;

    // End
    case 35:
      e.preventDefault();
      e.stopPropagation();

      // Set focus on last question
      lastQuestion.focus();
      break;

    // Enter/Space
    case 13:
    case 32:
      e.preventDefault();
      e.stopPropagation();

      // Show answer content
      showHeader(elem, thisAccordianHeaders);
      break;
    }

  };

  /**
   * On load, setup roles and initial properties
   */

  // Each FAQ Question
  accordianHeader.each(function (i) {
    $(this).attr({
      'id': 'accordian__header--' + i,
      'role': 'tab',
      'aria-controls': 'accordian__content--' + i,
      'aria-expanded': 'false',
      'aria-selected': 'false',
      'tabindex': '-1'
    });
  });

  // Each FAQ Answer
  accordianContent.each(function (i) {
    $(this).attr({
      'id': 'accordian__content--' + i,
      'role': 'tabpanel',
      'aria-labelledby': 'accordian__header--' + i,
      'aria-hidden': 'true'
    });
  });

  // Each FAQ Section
  accordian.each(function () {
    var $this = $(this),
      thisAccordianHeaders = $this.find('.accordian__header');

    // Set section attributes
    $this.attr({
      'role': 'tablist',
      'aria-multiselectable': 'true'
    });

    thisAccordianHeaders.each(function (i) {
      var $this = $(this);

      // Make first tab clickable
      if (i === 0) {
        $this.attr('tabindex', '0');
      }

      // Click event
      $this.on('click', function () {
        showHeader($(this), thisAccordianHeaders);
      });

      // Keydown event
      $this.on('keydown', function (e) {
        keyboardInteraction($(this), e, thisAccordianHeaders);
      });

      // Focus event
      $this.on('focus', function () {
        saveFocus($(this), thisAccordianHeaders);
      });
    });
  });

})(jQuery);
