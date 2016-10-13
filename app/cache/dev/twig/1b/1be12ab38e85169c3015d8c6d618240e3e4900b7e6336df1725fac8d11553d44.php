<?php

/* TwigBundle:Exception:exception.js.twig */
class __TwigTemplate_f874c4f35c2a8f238262ecc7686f8150907b915aa2792a5c9f272ce0b14c9aba extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_8748bbebd1a477e879a5fc08b89887c3d20b46804c431a059dda544ac8d2ea8e = $this->env->getExtension("native_profiler");
        $__internal_8748bbebd1a477e879a5fc08b89887c3d20b46804c431a059dda544ac8d2ea8e->enter($__internal_8748bbebd1a477e879a5fc08b89887c3d20b46804c431a059dda544ac8d2ea8e_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "TwigBundle:Exception:exception.js.twig"));

        // line 1
        echo "/*
";
        // line 2
        $this->loadTemplate("@Twig/Exception/exception.txt.twig", "TwigBundle:Exception:exception.js.twig", 2)->display(array_merge($context, array("exception" => (isset($context["exception"]) ? $context["exception"] : $this->getContext($context, "exception")))));
        // line 3
        echo "*/
";
        
        $__internal_8748bbebd1a477e879a5fc08b89887c3d20b46804c431a059dda544ac8d2ea8e->leave($__internal_8748bbebd1a477e879a5fc08b89887c3d20b46804c431a059dda544ac8d2ea8e_prof);

    }

    public function getTemplateName()
    {
        return "TwigBundle:Exception:exception.js.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  27 => 3,  25 => 2,  22 => 1,);
    }
}
/* /**/
/* {% include '@Twig/Exception/exception.txt.twig' with { 'exception': exception } %}*/
/* *//* */
/* */
