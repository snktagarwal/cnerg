<?php
class People extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('people_model');
	}

	public function index()
	{
		$data['people'] = $this->people_model->get_people();
		$this->load->helper('url');
		$this->load->view('header');
		$this->load->view('people',$data);
		//$this->load->view('templates/footer');
	}
}
?>
