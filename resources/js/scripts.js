toggleForm();

$('#income_monthly_0').change(function() {
    var value = parseInt($(this).val()) * 12;
    $('#income_annual_0').val(value);
});

$('#begin_form').click(function(e){
    e.preventDefault();
    navButtons(e);
})
$('#tab_next, #tab_previous').click(function(e) {
    e.preventDefault();
    var validateInputs = $('fieldset').filter(':visible').find(':input');
    $.each(validateInputs, function() {
	$(this).validationEngine('validate');
    });
    if ($('#validate').filter(':visible').validationEngine('validate')) {
	navButtons(e);
    }
    $('.mn_popover').popover('hide');
});
$('[data-toggle="pill"]').click(function(e){
    var validateInputs = $('fieldset').filter(':visible').find(':input');
    $.each(validateInputs, function() {
	$(this).validationEngine('validate');
    });
    if ($('#validate').filter(':visible').validationEngine('validate')) {
	return true;
    }
    else {
	return false;
    }
    $('.mn_popover').popover('hide');
})

$('body').on('shown.bs.tab', function(e) {
	var step = $(e.target).attr('href');
	manageButtons(step);
});

function toggleForm() {
    $('input[data-toggle="form-collapse"]').each(function() {
        var self = this;
        var type = $(this).attr('type');
        var target = $(this).data('target');

        switch (type) {
            case 'radio':
                var name = $(this).attr('name');

                $('[name="' + name + '"]').change(function() {
                    if ($(self).is(':checked')) {
                        $(target).addClass('in');
                    } else {
                        $(target).removeClass('in');
                    }
                });
                break;
        }
    });
}

/*----------- 07. ADD/REMOVE FIELDS ----------------- */
function addFields(cStructures, maxStructures, addElement, deleteElement) {
    // Variables
    var clonedStructures = $(cStructures);
    var index = clonedStructures.length;
    var lastClonedStructure = clonedStructures.last();
    // Logic
    if (clonedStructures.length <= (maxStructures)) {
        var temp = lastClonedStructure.clone();
        // Find all inputs and update the "index number" at the end of each "ID" and "name" attribute
        temp.find(':input').each(function() {
            var thisName = $(this).attr('name').slice(0, -1);
            var thisID = $(this).attr('id').slice(0, -1);
            $(this).attr({
                'name': thisName + index,
                'id': thisID + index,
		'value': ''
            });
        });
        // Find all labels and update the "index number" at the end of each "for" attribute
        temp.find('label').each(function() {
            var thisFor = $(this).attr('for').slice(0, -1);
            $(this).attr('for', thisFor + index);
        });
        // Append the new fieldset to the bottom of the parent element
        temp.insertAfter(lastClonedStructure);
        // Show the "Delete" link
        $(deleteElement).prop('disabled', false);
    }
    if (clonedStructures.length >= maxStructures) {
        $(addElement).prop('disabled', true);
    }
}
function deleteFields(cStructures, addElement, deleteElement) {
    // Variables
    var clonedStructures = $(cStructures);
    var lastClonedStructure = clonedStructures.last();
    console.log(lastClonedStructure);
    // If there are 2 or more fieldsets, remove the last fieldset
    if (clonedStructures.length >= 2) {
        lastClonedStructure.remove();
        $(addElement).prop('disabled', false);
    }
    // If there are 2 or less fieldsets, hide the "Delete" link
    if (clonedStructures.length <= 2) {
        $(deleteElement).prop('disabled', true);
    }
}

function navButtons(e) {
	var button = $(e.currentTarget).attr('id');
	var $activeTab = $('.tab-pane.active');
	var $activeTabId = $activeTab.attr('id').slice(-1);
	var position = parseInt($activeTabId);
	var newStep;

	if (button === 'tab_previous') {
		newStep = '#step' + (position - 1);
	} else {
		newStep = '#step' + (position + 1);
	}

	$('.tab-pane, .nav-pills li').removeClass('active');
	$(newStep).addClass('active');
	$('.nav-pills a[href="' + newStep + '"]').parent('li').addClass('active');

	manageButtons(newStep);
}

function manageButtons(step) {
	$('.next_prev .btn').removeClass('hidden');
	$(window).scrollTop(0);
	switch (step) {
		case '#step0':
			$('#tab_previous, #tab_next, #submit_form').addClass('hidden');
			break;
		case '#step4':
			$('#begin_form, #tab_next').addClass('hidden');
			break;
		default:
			$('#begin_form, #submit_form').addClass('hidden');
			break;

	}
}

$(function() {
     /* Validation */
     $("#validate").validationEngine();
    /* Add/Remove Fields Initialization */
    // Add the "onclick" event to the "Add" link
    $('.btnAdd').click(function(e) {
        e.preventDefault();
	console.log(this);
	var closestFieldset = $(e.currentTarget).closest('.step').find('fieldset');
	console.log(closestFieldset);
        addFields(closestFieldset, 8, e.currentTarget, '.btnDel');
    });
    // Add the "onclick" event to the "Delete" link
    $('.btnDel').click(function(e) {
        e.preventDefault();
	var closestFieldset = $(e.currentTarget).closest('.step').children('fieldset');
        deleteFields(closestFieldset, '.btnAdd', e.currentTarget);
    });
    // Hide the "Delete" link
    $('#btnDel').prop('disabled', true);
/* Add/Remove Fields Initialization */
    // Add the "onclick" event to the "Add" link
    //$('#btnTableAdd').click(function(e) {
    //    e.preventDefault();
    //    addFields('.clonedTableInput', 5, this, '#btnTableDel');
    //});
    //// Add the "onclick" event to the "Delete" link
    //$('#btnTableDel').click(function(e) {
    //    e.preventDefault();
    //    deleteFields('.clonedTableInput', '#btnTableAdd', this);
    //});
    //// Hide the "Delete" link
    //$('#btnTableDel').prop('disabled', true);


});
