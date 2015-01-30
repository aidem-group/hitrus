$(function() {
	var numOfCols = $('html').width() < 1200 ? 5 : 6;
	initBrandBlock(numOfCols);
});

function initBrandBlock( numberOfColumns )
{
	var column = 0;
	var groups = {};
	var columnBlock = '<div class="column"></div>';
	var maxColHeight = 0;
	var groupsHeight = 0;

	$('.brands-list').each(function() {
		var list = $(this);
		column = 0;
		maxColHeight = 0;
		groupsHeight = 0;
		groups = list.children();

		if (groups.length > numberOfColumns) {
			groups.each(function() {
				maxColHeight += $(this).outerHeight() / numberOfColumns;
			});

			groups.each(function(i) {
				$(this).addClass('column-' + column);
				groupsHeight += $(this).outerHeight();
				
				if (groupsHeight > maxColHeight || groups.length == ++i) {
					list.children('.column-' + column).wrapAll(columnBlock);
					++column;
					groupsHeight = 0;
				}
			});
		} else {
			groups.wrap(columnBlock);
		}
	});
}