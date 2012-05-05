<?php
class News_model extends CI_Model {

	public function __construct()
	{
		$this->load->database();
	}

	public function get_news()
	{
			$this->db->order_by('date','desc');
			$query = $this->db->get('news');
			return $query->result_array();
	}

	public function get_home_news($base_size = 5){
		/* Select those news which have home tag ticked on */
		/* We assume that we require 5 news in total, hence pick rest from latest-news */
		$this->db->from('news');
		$this->db->order_by('date','desc');
		$this->db->where('choose_home','YES');
		$news_major = array_splice($this->db->get()->result_array(),0,4);
		$rem =  $base_size - sizeof($news_major);
		if($rem > 0){
			$this->db->from('news');
			$this->db->where('choose_home','NO');
			$this->db->order_by('date','desc');
			$news_latest = array_splice($this->db->get()->result_array(),0,$rem);
			$news_major = array_merge($news_major, $news_latest);
		}
		return $news_major;
	}
}
?>
