<?php

/* TwigBundle:Exception:exception.atom.twig */
class __TwigTemplate_4f074219afe5657f64637972995d52b6ab6f2e97c433650d6a50b52cbc31e7fd extends Twig_Template
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
        $__internal_935884f5564ac722ab121a819cddefdf0970867afa20ab3ed9ab8e5208fd73a0 = $this->env->getExtension("native_profiler");
        $__internal_935884f5564ac722ab121a819cddefdf0970867afa20ab3ed9ab8e5208fd73a0->enter($__internal_935884f5564ac722ab121a819cddefdf0970867afa20ab3ed9ab8e5208fd73a0_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "TwigBundle:Exception:exception.atom.twig"));

        // line 1
        $this->loadTemplate("@Twig/Exception/exception.xml.twig", "TwigBundle:Exception:exception.atom.twig", 1)->display(array_merge($context, array("exception" => (isset($context["exception"]) ? $context["exception"] : $this->getContext($context, "exception")))));
        
        $__internal_935884f5564ac722ab121a819cddefdf0970867afa20ab3ed9ab8e5208fd73a0->leave($__internal_935884f5564ac722ab121a819cddefdf0970867afa20ab3ed9ab8e5208fd73a0_prof);

    }

    public function getTemplateName()
    {
        return "TwigBundle:Exception:exception.atom.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* {% include '@Twig/Exception/exception.xml.twig' with { 'exception': exception } %}*/
/* */
