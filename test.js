import {
	Selector
} from 'testcafe';

fixture `Test Bootstrap Select Dropdown instances with varying plugin parameter combinations for regular selects, multiselects and selects/multiselects with optgroups.`
	.page `http://localhost:8080/tests.html`;

let instanceCount = 12;

test(`Select (click) a random option from each drop-down menu and ensure the corresponding value is set on the <select> element.`, async t => {
	let i;
	for (i = 0; i < instanceCount; i++) {
		let selectElement = Selector('#test_' + i);
		let dropdownButton = Selector('#bsd' + (i + 1) + '-button');
		let dropdownItems = Selector('#bsd' + (i + 1) + '-container').find('.dropdown-item');
		let options = selectElement.find('option');
		let length = await options.count;
		let n = Math.floor(Math.random() * length);
		let text = await options.nth(n).innerText;
		let value = await options.nth(n).value;
		console.log(' Test ' + i + ': Select "' + text + '" (' + value + ').');
		await t
			.click(dropdownButton)
			.click(dropdownItems.withText(text))
			.expect(selectElement.value).eql(value);
	}
});
