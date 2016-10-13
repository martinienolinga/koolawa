<?php

/* WebProfilerBundle:Profiler:ajax_layout.html.twig */
class __TwigTemplate_6a4fb3f11fca0859fd43153142a970a6609a2a959ed7453a7d766c9b149b854f extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
            'panel' => array($this, 'block_panel'),
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_746c11529048cd3d74c0853ad3be8dbfa55ff737e2a64fb499162e27dc22a1e3 = $this->env->getExtension("native_profiler");
        $__internal_746c11529048cd3d74c0853ad3be8dbfa55ff737e2a64fb499162e27dc22a1e3->enter($__internal_746c11529048cd3d74c0853ad3be8dbfa55ff737e2a64fb499162e27dc22a1e3_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "WebProfilerBundle:Profiler:ajax_layout.html.twig"));

        // line 1
        $this->displayBlock('panel', $context, $blocks);
        
        $__internal_746c11529048cd3d74c0853ad3be8dbfa55ff737e2a64fb499162e27dc22a1e3->leave($__internal_746c11529048cd3d74c0853ad3be8dbfa55ff737e2a64fb499162e27dc22a1e3_prof);

    }

    public function block_panel($context, array $blocks = array())
    {
        $__internal_eb9173113f53456ef2e70b0f6dce47f43649b5f38da7ed5c42a0427942d9ac6a = $this->env->getExtension("native_profiler");
        $__internal_eb9173113f53456ef2e70b0f6dce47f43649b5f38da7ed5c42a0427942d9ac6a->enter($__internal_eb9173113f53456ef2e70b0f6dce47f43649b5f38da7ed5c42a0427942d9ac6a_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "panel"));

        echo "";
        
        $__internal_eb9173113f53456ef2e70b0f6dce47f43649b5f38da7ed5c42a0427942d9ac6a->leave($__internal_eb9173113f53456ef2e70b0f6dce47f43649b5f38da7ed5c42a0427942d9ac6a_prof);

    }

    public function getTemplateName()
    {
        return "WebProfilerBundle:Profiler:ajax_layout.html.twig";
    }

    public function getDebugInfo()
    {
        return array (  23 => 1,);
    }
}
/* {% block panel '' %}*/
/* */
