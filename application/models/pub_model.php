<?php
class Pub_model extends CI_Model {

	public function __construct()
	{
		$this->load->database();
	}

	public function get_pub()
	{
		/* Simple query to retrieve year list
		 * select pub.year from pub group by pub.year order by pub.year desc;
		 */
		$this->db->select('pub.year');
		$this->db->from('pub');
		$this->db->group_by('pub.year');
		$this->db->order_by('date','desc');
		$query = $this->db->get();
		$year_list = $query->result_array();
		
		$pubs = null;

		foreach($year_list as $year){
			$this->db->select('*');
			$this->db->from('pub');
			$this->db->where('year',$year['year']);
			$this->db->order_by('date', 'desc');
			$pubs[$year['year']] = $this->db->get()->result_array();
		}
			
		return $pubs;
	}
	
	public function get_latest_pub()
	{
		/* Returns the top few publications */
		
		$this->db->select('*');
		$this->db->from('pub');
		$this->db->order_by('date', 'desc');
		return $this->db->get()->result_array();
	}
}
?>