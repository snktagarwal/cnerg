<?php
class Courses extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('course_model');
	}

	public function index()
	{
		
		$data['title'] = 'Courses Page';
		$data['courses'] = $this->course_model->get_courses();
		$this->load->helper('url');
		$this->load->view('header', $data);
		$this->load->view('courses', $data);
		//$this->load->view('templates/footer');
	}
}
?>
