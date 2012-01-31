<?php
class Activities extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		//$this->load->model('news_model');
	}

	public function index()
	{
		
		$data['title'] = 'Home Page';
		
		$this->load->helper('url');
		$this->load->view('header', $data);
		$this->load->view('activities', $data);
		//$this->load->view('templates/footer');
	}
}
?>
