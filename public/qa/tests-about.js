/**
 * Created by 振华 on 2017/1/22.
 */
suite('"About Page Tests"', function () {
    test('page should contain link to contact page', function () {
        assert($('a[href="/contact"]').length);
    });
});