<?php
class Event_model extends CI_Model {

	public function __construct()
	{
		$this->load->database();
	}

	public function get_events()
	{
		$this->db->select('*');
		
		$this->db->order_by('when', 'desc');		
		$query = $this->db->get('events');
		
		return $query->result_array();
		
	}
	
	public function get_home_events($base_size = 5){
		
		/* Select those events which have home tag ticked on */
		/* We assume that we require 5 events in total, hence pick rest from latest-events */
		
		$this->db->from('events');
		$this->db->order_by('when','desc');
		$this->db->where('choose_home','YES');
		$events_major = array_splice($this->db->get()->result_array(),0,4);
		$rem =  $base_size - sizeof($events_major);
		if($rem > 0){
			$this->db->from('events');
			$this->db->where('choose_home','NO');
			$this->db->order_by('when','desc');
			$events_latest = array_splice($this->db->get()->result_array(),0,$rem);
			$events_major = array_merge($events_major, $events_latest);
		}
		return $events_major;
	}
	
}
?>
