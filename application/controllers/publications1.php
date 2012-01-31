<?php
class Publications1 extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('pub_model');
	}

	public function index()
	{
		$data['pub_list'] = $this->pub_model->get_pub();
		
		$this->load->helper('url');
		$this->load->view('header');
		$this->load->view('publications1', $data);
	}

}
?>