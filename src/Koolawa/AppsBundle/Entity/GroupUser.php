<?php

namespace Koolawa\AppsBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * GroupUser
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Koolawa\AppsBundle\Entity\GroupUserRepository")
 */
class GroupUser
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
     * @ORM\Column(name="title", type="string", length=255)
     */
    private $title;

    /**
     * @var integer
     *
     * @ORM\Column(name="usergroupid", type="integer")
     */
    private $usergroupid;

    /**
     * @var boolean
     *
     * @ORM\Column(name="persist", type="boolean")
     */
    private $persist;



    public function __construct()
    {
        $this->title = '';
        $this->persist = false;
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
     * Set title
     *
     * @param string $title
     * @return GroupUser
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
     * Set persist
     *
     * @param boolean $persist
     * @return GroupUser
     */
    public function setPersist($persist)
    {
        $this->persist = $persist;

        return $this;
    }

    /**
     * Get persist
     *
     * @return boolean
     */
    public function getPersist()
    {
        return $this->persist;
    }

    /**
     * Set usergroupid
     *
     * @param integer $usergroupid
     * @return GroupUser
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
