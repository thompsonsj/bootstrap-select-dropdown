import { Selector } from 'testcafe';

fixture `Test Bootstrap Select Dropdown instance`
    .page `http://localhost:9000`;

const demoOverview = Selector('#demo_overview');
const demoOverviewDropdownItem = demoOverview.find('#bsd1-container .dropdown-item').withText('Cambodia');

test(`Select an option from the drop-down menu`, async t => {
    await t
        .click(citySelect)
        .click(cityOption.withText('London'))
        .expect(citySelect.value).eql('London');
});
