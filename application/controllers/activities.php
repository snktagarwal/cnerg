<?php
class Activities extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('event_model');
	}

	public function index()
	{
		
		$data['title'] = "Home Page";
		$data["event_list"] = $this->event_model->get_events();
		
		$this->load->helper('url');
		$this->load->view('header', $data);
		$this->load->view('activities', $data);
		//$this->load->view('templates/footer');
	}
}
?>
