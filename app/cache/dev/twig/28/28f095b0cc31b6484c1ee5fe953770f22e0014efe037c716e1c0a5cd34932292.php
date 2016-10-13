<?php

/* TwigBundle:Exception:error.js.twig */
class __TwigTemplate_d51197ef4ed7a80c47c84e19814c651e5f92d66c139fc7cb7fb3937284c47c15 extends Twig_Template
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
        $__internal_60af5c1677d97c86b461b9181b6281962133ed56e4f7e23c5b1f203f5dcbbe02 = $this->env->getExtension("native_profiler");
        $__internal_60af5c1677d97c86b461b9181b6281962133ed56e4f7e23c5b1f203f5dcbbe02->enter($__internal_60af5c1677d97c86b461b9181b6281962133ed56e4f7e23c5b1f203f5dcbbe02_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "TwigBundle:Exception:error.js.twig"));

        // line 1
        echo "/*
";
        // line 2
        echo twig_escape_filter($this->env, (isset($context["status_code"]) ? $context["status_code"] : $this->getContext($context, "status_code")), "js", null, true);
        echo " ";
        echo twig_escape_filter($this->env, (isset($context["status_text"]) ? $context["status_text"] : $this->getContext($context, "status_text")), "js", null, true);
        echo "

*/
";
        
        $__internal_60af5c1677d97c86b461b9181b6281962133ed56e4f7e23c5b1f203f5dcbbe02->leave($__internal_60af5c1677d97c86b461b9181b6281962133ed56e4f7e23c5b1f203f5dcbbe02_prof);

    }

    public function getTemplateName()
    {
        return "TwigBundle:Exception:error.js.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  25 => 2,  22 => 1,);
    }
}
/* /**/
/* {{ status_code }} {{ status_text }}*/
/* */
/* *//* */
/* */
