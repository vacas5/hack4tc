//$('.container').css('background', 'red');
/*----------- 07. ADD/REMOVE FIELDS ----------------- */
function addFields(clonedStructures, maxStructures, addElement, deleteElement) {
    // Variables
    var clonedStructures = $(clonedStructures);
    var index = clonedStructures.length + 1;
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
function deleteFields(clonedStructures, addElement, deleteElement) {
    // Variables
    var clonedStructures = $(clonedStructures);
    var lastClonedStructure = clonedStructures.last();
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

$(function() {
     /* Validation */
     $(".validate").validationEngine({
        showPrompt: {
            promptText: "Required"
        }
     });
    /* Add/Remove Fields Initialization */
    // Add the "onclick" event to the "Add" link
    $('#btnAdd').click(function(e) {
        e.preventDefault();
        addFields('fieldset', 8, this, '#btnDel');
    });
    // Add the "onclick" event to the "Delete" link
    $('#btnDel').click(function(e) {
        e.preventDefault();
        deleteFields('fieldset', '#btnAdd', this);
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
