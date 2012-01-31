<?php
class Projects extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('pro_model');
	}

	public function index()
	{
		
		$data['title'] = 'Projects Page';
		$data['projects'] = $this->pro_model->get_projects();
		$this->load->helper('url');
		$this->load->view('header', $data);
		$this->load->view('projects', $data);
		//$this->load->view('templates/footer');
	}
}
?>
