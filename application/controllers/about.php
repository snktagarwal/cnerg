<?php
class About extends CI_Controller {
	
	public function index()
	{
	
		$data['title'] = 'CNERG - About';
		
		$this->load->helper('url');
		$this->load->view('header');
		$this->load->view('about');
		//$this->load->view('templates/footer');
	}
}
?>
