/**
 * @desc Adds a blank new column to the markbook for displaying percentages
 */
const addPercentageColumn = () => {
    // add percent header
    $('<td class="mwTABLE_CELL_HEADER tdAchievement" style="font-weight: bold" align="center">Percent</td>').insertAfter('#markbookTable td:first');
    
    // narrow assignment name column width
    $('#markbookTable tr:not(:first)').each(function () {
        $(this).find('td:first').css('width', '250px');
    });

    // copy date column (to keep row style) and paste it after the first column
    $('#markbookTable tr:not(:first)').each(function () {
        const dateCell = $(this).find('td:nth-last-child(3)');
        $(dateCell).clone().insertAfter($(this).find('td:first'));
    });

    // clear the column of any text and change the font to the same as input boxes
    $('#markbookTable tr:not(:first) > td:nth-child(2)').each(function () {
        $(this).text('');
        $(this).css({
            'font-family': 'Monaco, Courier, monospace'
        });
    });
};

/**
 * @desc Iterates through the markbook and calculates the percentage for each row
 */
const calculatePercentages = () => {
    $('#markbookTable tr:not(:first)').each(function () {
        const mark = parseFloat($(this).find('td:nth-last-child(4) > input').val());
        const denominator = parseFloat($(this).find('td:nth-last-child(1) > input').val());

        const percentage = +(mark / denominator * 100).toFixed(2);
        const percentageCell = $(this).find('td:nth-child(2)');

        // change the percentage cell's value if the percentage is valid, otherwise clear it
        if (!isNaN(percentage)) {
            percentageCell.text(percentage);
        } else {
            percentageCell.text('');
        }
    });
};
