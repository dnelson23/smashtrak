/**
 * HomeController
 *
 * @description :: Manages public root pages
 */

module.exports = {

	index: function(req, res) {
		res.view('home/index');
	}

	faq: function(req, res) {
		res.view('home/faq');
	}
};

