<?php

namespace Koolawa\AppsBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * File
 *
 * @ORM\Table()
 * @ORM\Entity
 */
class File
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="filename", type="string", length=512)
     */
    private $filename;
    
    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255)
     */
    private $title;

    /**
     * @var integer
     *
     * @ORM\Column(name="usergroupid", type="integer")
     */
    private $usergroupid;
    
    public function __construct()
    {
    	$this->filename = '';
    	$this->title = '';
    	$this->usergroupid = 0;
    }

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set filename
     *
     * @param string $filename
     * @return File
     */
    public function setFilename($filename)
    {
        $this->filename = $filename;

        return $this;
    }

    /**
     * Get filename
     *
     * @return string 
     */
    public function getFilename()
    {
        return $this->filename;
    }
    
    /**
     * Set title
     *
     * @param string $title
     * @return File
     */
    public function setTitle($title)
    {
    	$this->title = $title;
    
    	return $this;
    }
    
    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
    	return $this->title;
    }

    /**
     * Set usergroupid
     *
     * @param integer $usergroupid
     * @return File
     */
    public function setUsergroupid($usergroupid)
    {
        $this->usergroupid = $usergroupid;

        return $this;
    }

    /**
     * Get usergroupid
     *
     * @return integer 
     */
    public function getUsergroupid()
    {
        return $this->usergroupid;
    }
}
