<?php
class Home extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('news_model');
		$this->load->model('pub_model');
		$this->load->model('event_model');
	}

	public function index()
	{
		//$data['news'] = array_splice($this->news_model->get_news(),1);
		$data['news'] = $this->news_model->get_home_news();
		$data['pub_list'] = array_splice($this->pub_model->get_latest_pub(),0,2);
		$data['event_list'] = $this->event_model->get_home_events();
		
		$data['title'] = 'Home Page';
		
		$this->load->helper('url');
		$this->load->view('header', $data);
		$this->load->view('home', $data);
		//$this->load->view('templates/footer');
	}
}
?>
